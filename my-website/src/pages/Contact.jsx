import '../App.css'
import ContactCard from '../components/ContactCard/ContactCard'

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
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select id="subject" name="subject">
              <option value="general">General Inquiry</option>
              <option value="order">Place an Order</option>
              <option value="custom">Custom Arrangement</option>
              <option value="wedding">Wedding Flowers</option>
              <option value="delivery">Delivery Question</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <button type="submit">Send Message</button>
        </form>
        
        <p>
          <strong>Response Time:</strong> We typically respond to all inquiries within 24 hours during business days.
          For urgent orders or questions, please call us directly.
        </p>
    </div>
  )
}

export default Contact