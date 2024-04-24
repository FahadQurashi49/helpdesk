import { notFound } from 'next/navigation';
import Ticket from '../../models/Ticket';

const dynamicParams = true;

export async function generateStaticParam() {
    const res = await fetch('http://localhost:4000/tickets/');
    const tickets: Ticket[] = await res.json();
    return tickets.map((ticket) => ({
        id: ticket.id
    }));
}

async function getTicket(id: string): Promise<Ticket> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60
        }
    })
    if (!res.ok) {
        notFound()
    }
    return res.json()
}

export default async function TicketDetails({ params }: {params: {id: string}}) {
    const ticket: Ticket = await getTicket(params.id);
  return (
    <main>
        <nav>
            Ticket Details
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created by {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
        </div>
    </main>
  )
}
