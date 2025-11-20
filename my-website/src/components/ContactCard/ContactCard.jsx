import './ContactCard.css';

function ContactCard({ icon, title, lines }) {
  return (
    <div className="contact-card">
      <h3 className="contact-card-title">
        <span className="contact-icon">{icon}</span>
        {title}
      </h3>
      <div className="contact-card-content">
        {lines.map((line, index) => (
          <p key={index} className="contact-line">{line}</p>
        ))}
      </div>
    </div>
  );
}

export default ContactCard;