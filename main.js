class AdminDashboard {
	constructor(dashboard, defaultTabIndex) {
		this.dashboard = dashboard;
		this.nav = this.dashboard.querySelector('.admin-dashboard__nav');
		this.tabcontent = Array.from(
			this.dashboard.querySelectorAll('.tabcontent')
		);

		this.defaultTabIndex = defaultTabIndex;

		document.addEventListener('DOMContentLoaded', () =>
			this.initiateDashboard(this.nav)
		);
	}

	initiateDashboard(nav) {
		const navResizeButton = nav.querySelector(
			'.admin-dashboard__nav-resize-button'
		);

		const primaryNavButtons = nav.querySelectorAll(
			'.dashboard__button.primary'
		);

		const secondaryNavButtons = nav.querySelectorAll(
			'.dashboard__button.secondary'
		);

		primaryNavButtons.forEach((button) => {
			button.addEventListener('click', () =>
				this.primaryButtonHandler(nav, button)
			);
		});

		secondaryNavButtons.forEach((button) => {
			button.addEventListener('click', () =>
				this.secondaryButtonHandler(nav, button)
			);
		});

		navResizeButton.addEventListener('click', () =>
			this.navResizeButtonHandler(nav)
		);

		// ensures nav is open on page load when screen size is large
		if (window.innerWidth >= 1024) {
			nav.classList.add('open');
		}

		window.addEventListener('resize', () => this.resizeWindowHandler(nav));

		// ensures default tab is selected when page loads
		primaryNavButtons[this.defaultTabIndex].click();
	}

	resizeWindowHandler(nav) {
		if (window.innerWidth <= 1024) {
			this.removeClass(nav, 'open');
		}

		if (window.innerWidth >= 1024) {
			this.addClass(nav, 'open');
		}
	}

	navResizeButtonHandler(nav) {
		const openAccordion = nav.querySelector('.accordion-content.open');

		/*
		if nav and accordion are open
		remove open class from open accordion
		to prevent accordion staying open when nav closes
		*/
		if (nav.classList.contains('open') && openAccordion) {
			this.removeClass(openAccordion, 'open');
		}

		nav.classList.toggle('open');
	}

	primaryButtonHandler(nav, button) {
		const accordionContent = button.nextElementSibling;

		// logic for if button has accordion content
		if (accordionContent) {
			// open state
			if (nav.classList.contains('open')) {
				const firstSecondaryButton = accordionContent.querySelector(
					'.dashboard__button.secondary'
				);
				// removes active state from all accordions
				this.removeClassAll(nav, '.accordion-content', 'active');
				// ensures first secondary button runs logic
				firstSecondaryButton.click();
			}

			// closed state
			if (!nav.classList.contains('open')) {
				/*
				if user selcts nav button not open, close open accordion
				else toggle accorion open state
				prevents two accordions to be open at once
				*/
				if (!accordionContent.classList.contains('open')) {
					this.removeClassAll(nav, '.accordion-content', 'open');
					this.addClass(accordionContent, 'open');
				} else {
					accordionContent.classList.toggle('open');
				}
			}
		} else {
			// removes active class from all primary buttons
			this.removeClassAll(nav, '.dashboard__button.primary', 'active');
			// removes active class from all secondary buttons
			this.removeClassAll(nav, '.dashboard__button.active', 'active');
			// removes active classes from all accordions
			this.removeClassAll(nav, '.accordion-content', 'active');
			// closes any open accordions
			this.removeClassAll(nav, '.accordion-content', 'open');
			// adds active class to current button
			this.addClass(button, 'active');
			// runs data handler
			this.dataHandler(button);
		}
	}

	secondaryButtonHandler(nav, button) {
		const parentAcordion = button.parentElement.parentElement;
		const primaryButton = parentAcordion.previousElementSibling;

		// removes active class from all primary buttons
		this.removeClassAll(nav, '.dashboard__button.primary', 'active');
		// removes active class from all secondary buttons
		this.removeClassAll(nav, '.dashboard__button.secondary', 'active');
		// removes active class from all accordion content
		this.removeClassAll(nav, '.accordion-content', 'active');
		// adds active class to current button
		this.addClass(button, 'active');
		// adds active class to current accordion
		this.addClass(parentAcordion, 'active');
		// add an active class to primary button
		this.addClass(primaryButton, 'active');
		// run data handler for current button
		this.dataHandler(button);

		if (!nav.classList.contains('open')) {
			this.removeClass(parentAcordion, 'open');
		}
	}

	addClass(item, classToAdd) {
		item.classList.add(classToAdd);
	}

	removeClass(item, classToRemove) {
		item.classList.remove(classToRemove);
	}

	removeClassAll(group, item, classToRemove) {
		group.querySelectorAll(item).forEach((i) => {
			this.removeClass(i, classToRemove);
		});
	}

	dataHandler(i) {
		const dataAttribute = i.dataset.forTab;

		this.removeClassAll(this.dashboard, '.tabcontent', 'active');
		this.tabcontent.forEach((tab) => {
			if (tab.dataset.tab === dataAttribute) {
				this.addClass(tab, 'active');
			}
		});
	}
}

const adminDashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	adminDashboardArray[index] = new AdminDashboard(dashboard, 0);
});
