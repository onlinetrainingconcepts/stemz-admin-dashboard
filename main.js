class AdminDashboard {
	constructor(dashboard, defaultTabIndex) {
		this.dashboard = dashboard;
		this.navButtons = this.dashboard.querySelectorAll(
			'.dashboard__nav--button'
		);
		this.contentContainer = this.dashboard.querySelector(
			'.admin-dashboard__content'
		);
		this.defaultTabIndex = defaultTabIndex;

		document.addEventListener(
			'DOMContentLoaded',
			this.initiateDashboard(this.navButtons)
		);

		// ensures default content shows on load
		this.navButtons[this.defaultTabIndex].click();
	}

	initiateDashboard(buttons) {
		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const accordionContent = button.nextElementSibling;

				button.classList.toggle('active');

				// adds active class to accordion content upon click
				if (button.classList.contains('active')) {
					accordionContent.classList.add('active');
				} else {
					accordionContent.classList.remove('active');
				}
			});
		});
	}
}

const dashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	dashboardArray[index] = new AdminDashboard(dashboard, 0);
});
