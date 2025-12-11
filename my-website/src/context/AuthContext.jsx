import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount and listen for auth changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'customer'
        });
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'customer'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login function (Supabase uses email, not username)
  const login = async (username, password) => {
    try {
      setError(null);
      
      // Try to login with email (if username looks like email)
      // Otherwise, we'll need to look up the email from username
      let email = username;
      
      // If username doesn't contain @, look up the user's email from profiles table
      if (!username.includes('@')) {
        const { data: profile, error: lookupError } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', username)
          .single();
        
        if (lookupError) {
          console.error('Profile lookup error:', lookupError);
          throw new Error('Username not found. Please use your email address to login.');
        }
        
        if (!profile) {
          throw new Error('Username not found. Please use your email address to login.');
        }
        
        email = profile.email;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        
        // Check if email needs to be confirmed
        if (signInError.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email before logging in. Check your inbox.');
        }
        
        throw new Error('Incorrect email or password');
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      setError(null);

      // Sign up with Supabase Auth (trigger will create profile automatically)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            role: 'customer'
          }
        }
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      // Profile will be created automatically by database trigger
      console.log('User registered successfully:', data);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setError(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Get auth token (for Supabase, returns the session token)
  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    getToken,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
