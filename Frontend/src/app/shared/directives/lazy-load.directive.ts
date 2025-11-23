import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appLazyLoad]',
    standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
    private observer: IntersectionObserver | null = null;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        // Create Intersection Observer options
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: '0px 0px 50px 0px'
        };

        // Create and start observing
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Add fade-in animation when scrolled into view
                if (entry.isIntersecting) {
                    this.el.nativeElement.classList.add('fade-in');

                    // Stop observing after animation triggers
                    if (this.observer) {
                        this.observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
