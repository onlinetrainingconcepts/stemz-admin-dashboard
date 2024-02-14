class AdminDashboard {
	constructor(dashboard, defaultTabIndex) {
		this.dashboard = dashboard;
		this.nav = this.dashboard.querySelector('.admin-dashboard__nav');
		this.primaryButtons = this.nav.querySelectorAll(
			'.dashboard__button.primary'
		);
		this.tabcontent = Array.from(
			this.dashboard.querySelectorAll('.tabcontent')
		);

		// this.navButtons = this.dashboard.querySelectorAll('.dashboard__button');
		// this.contentContainer = this.dashboard.querySelector(
		// 	'.admin-dashboard__content'
		// );
		this.defaultTabIndex = defaultTabIndex;

		document.addEventListener(
			'DOMContentLoaded',
			this.initiateDashboard(this.nav)
		);

		// ensures default content shows on load
		// this.navButtons[this.defaultTabIndex].click();
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

		// refactor later to watch for window size changes
		if (window.innerWidth >= 1024) {
			nav.classList.add('open');
		}

		navResizeButton.addEventListener('click', () =>
			this.navResizeButtonHandler(nav)
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

		// ensures default tab is selected when page loads
		this.primaryButtons[this.defaultTabIndex].click();
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
				accordionContent.classList.toggle('open');
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

	primaryButtonHandlerOLD(nav, button) {
		// remove all active classes from primary buttons
		// add an active class to current button

		// if button has accordion content, add open class to
		this.removeClassAll(nav, '.dashboard__button.primary', 'active');
		this.removeClassAll(nav, '.accordion-content', 'active');

		/*
		if check determines whether or not
		button has accordion content
		*/
		if (button.nextElementSibling) {
			const accordionContent = button.nextElementSibling;
			const firstAccordionButton = accordionContent.querySelector('.secondary');

			this.addClass(accordionContent, 'active');

			// open nav actions
			if (nav.classList.contains('open')) {
				this.addClass(accordionContent, 'open');
				firstAccordionButton.click();
			}

			// closed nav actions
			if (!nav.classList.contains('open')) {
				accordionContent.classList.toggle('open');
			}
		} else {
			this.removeClassAll(nav, '.dashboard__button.secondary', 'active');
			this.dataHandler(button);
		}

		this.addClass(button, 'active');
	}

	secondaryButtonHandlerOLD(nav, button) {
		const accordionContainer = button.parentElement.parentElement;
		const associatedPrimaryButton = accordionContainer.previousElementSibling;

		// closed nav actions
		if (!nav.classList.contains('open')) {
			this.removeClass(accordionContainer, 'open');
		}

		// open nav actions
		// n/a

		/*
		removes active classes from all primary buttons
		and assigns active class to the button associated
		with secondary button
		*/
		this.removeClassAll(nav, '.dashboard__button.primary', 'active');
		this.removeClassAll(nav, '.dashboard__button.secondary', 'active');
		this.addClass(associatedPrimaryButton, 'active');
		this.addClass(button, 'active');

		this.dataHandler(button);
	}

	// navButtonHandler(button) {
	// 	let accordionContent;
	// 	let tabNumber;
	// 	let tabToActivate;

	// 	// if button has a sibling, continue
	// 	if (button.nextElementSibling) {
	// 		// varifies sibiling is accordion content before assigning variable
	// 		if (button.nextElementSibling.classList.contains('accordion-content')) {
	// 			accordionContent = button.nextElementSibling;
	// 		} else {
	// 			accordionContent = null;
	// 		}
	// 	}

	// 	// verifies button contains property before assigning variable
	// 	if (button.dataset.forTab) {
	// 		tabNumber = button.dataset.forTab;
	// 	} else {
	// 		tabNumber = null;
	// 	}

	// 	// removes active class for all buttons and accordion content
	// 	this.removeClassAll(this.nav, '.dashboard__button', 'active');
	// 	this.removeClassAll(this.nav, '.accordion-content', 'active');

	// 	// adds active class for current button
	// 	this.addClass(button, 'active');

	// 	// if button has accordion items, do the following
	// 	if (accordionContent) {
	// 		const firstButton = accordionContent.querySelector('.dashboard__button');
	// 		// adds active class for accordion content
	// 		this.addClass(accordionContent, 'active');

	// 		// clicks first accordion button in the series
	// 		firstButton.click();
	// 	}

	// 	// if button does not have accordion items, do the following
	// 	if (tabNumber) {
	// 		// assigns value to variable
	// 		tabToActivate = this.contentContainer.querySelector(
	// 			`.tabcontent[data-tab="${tabNumber}"]`
	// 		);

	// 		// removes active classes for all tab content
	// 		this.removeClassAll(
	// 			this.contentContainer,
	// 			'.tabcontent',
	// 			'tabcontent--active'
	// 		);

	// 		// adds active class to current tab content
	// 		this.addClass(tabToActivate, 'tabcontent--active');
	// 	}
	// }

	// accordionButtonHandler(button) {
	// 	const tabNumber = button.dataset.forTab;
	// 	const tabToActivate = this.contentContainer.querySelector(
	// 		`.tabcontent[data-tab="${tabNumber}"]`
	// 	);
	// 	this.removeClassAll(this.nav, '.dashboard__button.sub', 'active');
	// 	this.removeClassAll(
	// 		this.contentContainer,
	// 		'.tabcontent',
	// 		'tabcontent--active'
	// 	);
	// 	this.addClass(button, 'active');
	// 	this.addClass(tabToActivate, 'tabcontent--active');
	// }

	// initiateDashboard(nav) {
	// 	const navBtns = nav.querySelectorAll('.main');
	// 	const accordionBtns = nav.querySelectorAll('.sub');

	// 	navBtns.forEach((button) => {
	// 		button.addEventListener('click', () => {
	// 			this.navButtonHandler(button);
	// 		});
	// 	});

	// 	accordionBtns.forEach((button) => {
	// 		button.addEventListener('click', () => {
	// 			this.accordionButtonHandler(button);
	// 		});
	// 	});
	// }
}

const adminDashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	adminDashboardArray[index] = new AdminDashboard(dashboard, 0);
});
