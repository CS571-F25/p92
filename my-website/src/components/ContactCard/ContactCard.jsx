import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import './ContactCard.css';

function ContactCard({ icon, title, lines }) {
  return (
    <Card className="contact-card">
      <CardHeader>
        <CardTitle className="contact-card-title">
          <span className="contact-icon">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="contact-card-content">
        {lines.map((line, index) => (
          <p key={index} className="contact-line">{line}</p>
        ))}
      </CardContent>
    </Card>
  );
}

export default ContactCard;