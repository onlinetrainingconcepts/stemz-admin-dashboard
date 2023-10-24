class AdminDashboard {
	constructor(dashboard, defaultTabIndex) {
		this.dashboard = dashboard;
		this.nav = this.dashboard.querySelector('.admin-dashboard__nav');
		this.navButtons = this.dashboard.querySelectorAll(
			'.dashboard__nav--button'
		);
		this.contentContainer = this.dashboard.querySelector(
			'.admin-dashboard__content'
		);
		this.defaultTabIndex = defaultTabIndex;

		document.addEventListener(
			'DOMContentLoaded',
			this.initiateDashboard(this.nav)
		);

		// ensures default content shows on load
		this.navButtons[this.defaultTabIndex].click();
	}

	removeClassAll(group, item, classToRemove) {
		group.querySelectorAll(item).forEach((i) => {
			i.classList.remove(classToRemove);
		});
	}

	removeClass(item, classToRemove) {
		item.classList.remove(classToRemove);
	}

	addClass(item, classToAdd) {
		item.classList.add(classToAdd);
	}

	navButtonHandler(button) {
		const accordionContent = button.nextElementSibling;

		button.classList.toggle('active');

		if (button.classList.contains('active')) {
			this.addClass(accordionContent, 'active');
		} else {
			this.removeClass(accordionContent, 'active');
		}
	}

	accordionButtonHandler(button) {
		const tabNumber = button.dataset.forTab;
		const tabToActivate = this.contentContainer.querySelector(
			`.tabcontent[data-tab="${tabNumber}"]`
		);
		this.removeClassAll(this.nav, '.dashboard__accordion--button', 'active');
		this.addClass(button, 'active');
		this.removeClassAll(
			this.contentContainer,
			'.tabcontent',
			'tabcontent--active'
		);
		this.addClass(tabToActivate, 'tabcontent--active');
	}

	initiateDashboard(nav) {
		const navBtns = nav.querySelectorAll('.dashboard__nav--button');
		const accordionBtns = nav.querySelectorAll('.dashboard__accordion--button');

		navBtns.forEach((navButton) => {
			navButton.addEventListener('click', () => {
				this.navButtonHandler(navButton);
			});
		});

		accordionBtns.forEach((accordionButton) => {
			accordionButton.addEventListener('click', () => {
				this.accordionButtonHandler(accordionButton);
			});
		});

		// ensures the first accorion button shows by default
		accordionBtns[0].click();
	}

	// initiateDashboard(buttons) {
	// 	buttons.forEach((button) => {
	// 		button.addEventListener('click', () => {
	// 			const accordionContent = button.nextElementSibling;
	// 			const accordionButtons = accordionContent.querySelectorAll(
	// 				'.dashboard__accordion--button'
	// 			);

	// 			accordionButtons.forEach((btn) => {
	// 				// variables
	// 				const tabNumber = btn.dataset.forTab;
	// 				const tabToActivate = this.contentContainer.querySelector(
	// 					`.tabcontent[data-tab="${tabNumber}"]`
	// 				);

	// 				// adds event listeners to each accordion button
	// 				btn.addEventListener('click', () => {
	// 					// removes active class for all accordion buttons
	// 					accordionButtons.forEach((btn) => {
	// 						btn.classList.remove('active');
	// 					});

	// 					// removes active classes for all tabconent sections
	// 					this.contentContainer
	// 						.querySelectorAll('.tabcontent')
	// 						.forEach((tab) => {
	// 							tab.classList.remove('tabcontent--active');
	// 						});

	// 					// adds active class to current button
	// 					btn.classList.add('active');
	// 					// adds active class to tabToActivate tab
	// 					tabToActivate.classList.add(`tabcontent--active`);
	// 				});
	// 			});

	// 			button.classList.toggle('active');

	// 			// adds active class to accordion content upon click
	// 			if (button.classList.contains('active')) {
	// 				accordionContent.classList.add('active');
	// 			} else {
	// 				accordionContent.classList.remove('active');
	// 			}
	// 		});
	// 	});
	// }
}

const dashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	dashboardArray[index] = new AdminDashboard(dashboard, 0);
});
