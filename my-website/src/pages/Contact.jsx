import '../App.css'
import ContactCard from '../components/ContactCard/ContactCard'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function Contact() {
  return (
    <div className="app-content">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have questions about our flowers, need help with an order, 
          or want to discuss a custom arrangement, we're here to help.
        </p>
        
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="contact-details">
            <ContactCard 
              icon="📞" 
              title="Phone" 
              lines={["(555) 123-FLOWER", "(555) 123-3569"]} 
            />
            
            <ContactCard 
              icon="📧" 
              title="Email" 
              lines={["info@maimaiflowers.com", "orders@maimaiflowers.com"]} 
            />
            
            <ContactCard 
              icon="📍" 
              title="Address" 
              lines={["123 Flower Street", "Garden City, State 12345"]} 
            />
            
            <ContactCard 
              icon="🕒" 
              title="Hours" 
              lines={[
                "Monday - Friday: 8:00 AM - 7:00 PM",
                "Saturday: 9:00 AM - 6:00 PM", 
                "Sunday: 10:00 AM - 4:00 PM"
              ]} 
            />
          </div>
        </div>
        
        <h2>Send Us a Message</h2>
        <form className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
            <Label htmlFor="name" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              required 
              style={{
                fontSize: '1.1rem',
                padding: '0.85rem',
                height: 'auto',
                border: '2px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '32px',
                backgroundColor: '#f8f9fa',
                color: '#000'
              }}
            />
          </div>
          
          <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
            <Label htmlFor="email" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              required 
              style={{
                fontSize: '1.1rem',
                padding: '0.85rem',
                height: 'auto',
                border: '2px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '32px',
                backgroundColor: '#f8f9fa',
                color: '#000'
              }}
            />
          </div>
          
          <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
            <Label htmlFor="phone" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Phone</Label>
            <Input 
              type="tel" 
              id="phone" 
              name="phone" 
              style={{
                fontSize: '1.1rem',
                padding: '0.85rem',
                height: 'auto',
                border: '2px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '32px',
                backgroundColor: '#f8f9fa',
                color: '#000'
              }}
            />
          </div>
          
          <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
            <Label htmlFor="subject" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Subject</Label>
            <Select>
              <SelectTrigger 
                style={{
                  fontSize: '1.1rem',
                  padding: '0.85rem',
                  height: 'auto',
                  border: '2px solid #ccc',
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: '32px',
                  backgroundColor: '#f8f9fa',
                  color: '#000'
                }}
              >
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: '#fff',
                  border: '2px solid #ccc',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  width: 'var(--radix-select-trigger-width)',
                  maxWidth: '500px'
                }}
              >
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectSeparator style={{ backgroundColor: '#e0e0e0', height: '1px', margin: '0.25rem 0' }} />
                <SelectItem value="order">Place an Order</SelectItem>
                <SelectSeparator style={{ backgroundColor: '#e0e0e0', height: '1px', margin: '0.25rem 0' }} />
                <SelectItem value="custom">Custom Arrangement</SelectItem>
                <SelectSeparator style={{ backgroundColor: '#e0e0e0', height: '1px', margin: '0.25rem 0' }} />
                <SelectItem value="wedding">Wedding Flowers</SelectItem>
                <SelectSeparator style={{ backgroundColor: '#e0e0e0', height: '1px', margin: '0.25rem 0' }} />
                <SelectItem value="delivery">Delivery Question</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div style={{ width: '100%', maxWidth: '500px', boxSizing: 'border-box' }}>
            <Label htmlFor="message" style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              rows="5" 
              required
              style={{
                fontSize: '1.1rem',
                padding: '0.85rem',
                border: '2px solid #ccc',
                width: '100%',
                boxSizing: 'border-box',
                borderRadius: '16px',
                backgroundColor: '#f8f9fa',
                color: '#000',
                resize: 'vertical'
              }}
            />
          </div>
          
          <Button 
            type="submit"
            style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: '#203d2b',
              color: 'white',
              fontSize: '1.1rem',
              padding: '0.85rem',
              borderRadius: '32px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2d5a3d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#203d2b'}
          >
            Send Message
          </Button>
        </form>
        
        <p>
          <strong>Response Time:</strong> We typically respond to all inquiries within 24 hours during business days.
          For urgent orders or questions, please call us directly.
        </p>
    </div>
  )
}

export default Contact