class AdminDashboard {
	constructor(dashboard, defaultTabIndex) {
		this.dashboard = dashboard;
		this.nav = this.dashboard.querySelector('.admin-dashboard__nav');
		this.navButtons = this.dashboard.querySelectorAll('.dashboard__button');
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
		let accordionContent;
		let tabNumber;
		let tabToActivate;

		// if button has a sibling, continue
		if (button.nextElementSibling) {
			// varifies sibiling is accordion content before assigning variable
			if (button.nextElementSibling.classList.contains('accordion-content')) {
				accordionContent = button.nextElementSibling;
			} else {
				accordionContent = null;
			}
		}

		// verifies button contains property before assigning variable
		if (button.dataset.forTab) {
			tabNumber = button.dataset.forTab;
		} else {
			tabNumber = null;
		}

		// removes active class for all buttons and accordion content
		this.removeClassAll(this.nav, '.dashboard__button', 'active');
		this.removeClassAll(this.nav, '.accordion-content', 'active');

		// adds active class for current button
		this.addClass(button, 'active');

		// if button has accordion items, do the following
		if (accordionContent) {
			const firstButton = accordionContent.querySelector('.dashboard__button');
			// adds active class for accordion content
			this.addClass(accordionContent, 'active');

			// clicks first accordion button in the series
			firstButton.click();
		}

		// if button does not have accordion items, do the following
		if (tabNumber) {
			// assigns value to variable
			tabToActivate = this.contentContainer.querySelector(
				`.tabcontent[data-tab="${tabNumber}"]`
			);

			// removes active classes for all tab content
			this.removeClassAll(
				this.contentContainer,
				'.tabcontent',
				'tabcontent--active'
			);

			// adds active class to current tab content
			this.addClass(tabToActivate, 'tabcontent--active');
		}
	}

	accordionButtonHandler(button) {
		const tabNumber = button.dataset.forTab;
		const tabToActivate = this.contentContainer.querySelector(
			`.tabcontent[data-tab="${tabNumber}"]`
		);
		this.removeClassAll(this.nav, '.dashboard__button.sub', 'active');
		this.removeClassAll(
			this.contentContainer,
			'.tabcontent',
			'tabcontent--active'
		);
		this.addClass(button, 'active');
		this.addClass(tabToActivate, 'tabcontent--active');
	}

	initiateDashboard(nav) {
		const navBtns = nav.querySelectorAll('.main');
		const accordionBtns = nav.querySelectorAll('.sub');

		navBtns.forEach((button) => {
			button.addEventListener('click', () => {
				this.navButtonHandler(button);
			});
		});

		accordionBtns.forEach((button) => {
			button.addEventListener('click', () => {
				this.accordionButtonHandler(button);
			});
		});
	}
}

const adminDashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	adminDashboardArray[index] = new AdminDashboard(dashboard, 0);
});
