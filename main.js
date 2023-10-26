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
		this.removeClassAll(this.nav, '.dashboard__button.sub', 'active');
		this.addClass(button, 'active');
		this.removeClassAll(
			this.contentContainer,
			'.tabcontent',
			'tabcontent--active'
		);
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

		// ensures the first accorion button shows by default
		accordionBtns[0].click();
	}
}

const adminDashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	adminDashboardArray[index] = new AdminDashboard(dashboard, 0);
});
