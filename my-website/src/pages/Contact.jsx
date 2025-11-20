import '../App.css'

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
            <div className="contact-method">
              <h3>📞 Phone</h3>
              <p>(555) 123-FLOWER</p>
              <p>(555) 123-3569</p>
            </div>
            
            <div className="contact-method">
              <h3>📧 Email</h3>
              <p>info@maimaiflowers.com</p>
              <p>orders@maimaiflowers.com</p>
            </div>
            
            <div className="contact-method">
              <h3>📍 Address</h3>
              <p>123 Flower Street</p>
              <p>Garden City, State 12345</p>
            </div>
            
            <div className="contact-method">
              <h3>🕒 Hours</h3>
              <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
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