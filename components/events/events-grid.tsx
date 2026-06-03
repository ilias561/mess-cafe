import EventCard from '@/components/events/event-card'
import SectionReveal from '@/components/section-reveal'
import type { Event } from '@/lib/events/events'

type EventsGridProps = {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

function upcomingGridClass(count: number) {
  if (count === 1) {
    return 'mt-10 mx-auto grid max-w-[520px] grid-cols-1 justify-items-center gap-6'
  }
  if (count === 2) {
    return 'mt-10 mx-auto grid max-w-[920px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'
  }
  return 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3'
}

export default function EventsGrid({ upcomingEvents, pastEvents }: EventsGridProps) {
  return (
    <>
      <section className="bg-bone px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionReveal>
            <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-olive">ΕΠΟΜΕΝΕΣ ΕΚΔΗΛΩΣΕΙΣ</p>
          </SectionReveal>
          {upcomingEvents.length > 0 ? (
            <div className={upcomingGridClass(upcomingEvents.length)}>
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="ui-card-elevated mt-10 rounded-[2px] border border-line/40 bg-bone-warm px-8 py-14 text-center md:py-20">
              <p className="mx-auto max-w-[44ch] font-serif text-[clamp(22px,3vw,30px)] leading-snug tracking-tight text-charcoal">
                Δεν υπάρχουν προγραμματισμένες εκδηλώσεις αυτή τη στιγμή.
              </p>
              <p className="mx-auto mt-4 max-w-[52ch] font-sans text-[15px] leading-relaxed text-concrete">
                Ετοιμάζουμε τα επόμενα workshops και events — ακολούθησέ μας στο Instagram για να τα μάθεις πρώτος,
                ή κλείσε τον δικό σου χώρο παρακάτω.
              </p>
              <a
                href="https://www.instagram.com/m.e.s.s._ioannina/"
                target="_blank"
                rel="noopener noreferrer"
                className="ui-interactive mt-8 inline-flex items-center rounded-full bg-mustard px-8 py-3.5 font-sans text-sm font-medium text-ink-dark transition-colors duration-150 hover:bg-amber"
              >
                Ακολούθησέ μας →
              </a>
            </div>
          )}
        </div>
      </section>

      {pastEvents.length ? (
        <section className="bg-forest px-6 py-24 text-charcoal md:px-12 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <SectionReveal>
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-mustard">ΑΡΧΕΙΟ · ΠΑΛΑΙΟΤΕΡΕΣ</p>
            </SectionReveal>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} dimmed />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
