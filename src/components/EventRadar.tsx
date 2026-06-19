import React, { useState } from 'react';
import { Calendar, Users, MapPin, Zap } from 'lucide-react';
import { events } from '../data/mockData';
import { TicketModal } from './modals/TicketModal';

export const EventRadar: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  const openTicketModal = (eventId: string) => {
    setSelectedEventId(eventId);
    setTicketModalOpen(true);
  };

  const calculateCapacityPercentage = (claimed: number, capacity: number) => {
    return (claimed / capacity) * 100;
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-acid-green bg-black text-acid-green mb-4">
            <Zap size={16} />
            <span className="text-sm font-medium">RESTRICTED ACCESS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">NOT EVERYONE SEES</span><br />
            <span className="text-acid-green">THESE EVENTS</span>
          </h1>
          <p className="text-gray-400 text-lg">Access Kochi's underground gigs. Exact coordinates disclosed to confirmed ticket holders 4 hours before kickoff.</p>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {events.map((event) => {
            const capacityPercent = calculateCapacityPercentage(event.claimed, event.capacity);
            const availableSlots = event.capacity - event.claimed;

            return (
              <div
                key={event.id}
                className="group bg-industrial-gray border border-industrial-gray-light rounded-lg p-6 hover:border-acid-green transition-all hover:shadow-neon-green"
              >
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  {/* Left: Event Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm font-bold text-acid-green mb-2">{event.day.toUpperCase()}</div>
                        <h2 className="text-2xl md:text-3xl font-black mb-2">{event.title}</h2>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {event.venuType}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.genre.split(', ').map((g) => (
                        <span
                          key={g}
                          className="px-3 py-1 bg-black border border-acid-green text-acid-green text-xs font-medium rounded"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Capacity & Action */}
                  <div className="flex flex-col gap-6">
                    {/* Capacity Meter */}
                    <div>
                      <h3 className="text-sm font-bold text-acid-green mb-3">CAPACITY</h3>
                      <div className="bg-black border border-industrial-gray-light rounded-lg p-4">
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-mono text-white">
                              {event.claimed}/{event.capacity} slots claimed
                            </span>
                            <span
                              className={`text-sm font-bold ${
                                availableSlots < 20 ? 'text-red-500' : 'text-acid-green'
                              }`}
                            >
                              {availableSlots} left
                            </span>
                          </div>
                          <div className="h-2 bg-industrial-gray-light rounded-full overflow-hidden">
                            <div
                              className="h-full bg-acid-green transition-all duration-300"
                              style={{ width: `${capacityPercent}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          {capacityPercent.toFixed(0)}% capacity
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => openTicketModal(event.id)}
                      className="w-full px-4 py-3 bg-acid-green text-black font-bold rounded hover:shadow-neon-green-lg transition-all group-hover:scale-105"
                    >
                      {availableSlots > 0 ? 'Get Tickets' : 'Guestlist'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ticket Modal */}
      {ticketModalOpen && selectedEventId && (
        <TicketModal
          eventId={selectedEventId}
          onClose={() => setTicketModalOpen(false)}
        />
      )}
    </div>
  );
};
