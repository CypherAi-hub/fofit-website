import { testimonials } from "../../data/testimonials";
import { Card } from "../ui/Card";

export function TestimonialGrid() {
  return (
    <div className="testimonial-grid">
      {testimonials.map((testimonial) => (
        <Card className="testimonial-card reveal" key={testimonial.name}>
          <p>{testimonial.quote}</p>
          <div>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
