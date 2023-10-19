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
				const tabNumber = button.dataset.forTab;
				const tabToActivate = this.contentContainer.querySelector(
					`.tabcontent[data-tab="${tabNumber}"]`
				);

				this.navButtons.forEach((button) => {
					button.classList.remove('active');
				});

				this.contentContainer.querySelectorAll('.tabcontent').forEach((tab) => {
					tab.classList.remove('tabcontent--active');
				});

				button.classList.add('active');

				tabToActivate.classList.add('tabcontent--active');
			});
		});
	}
}

const dashboardArray = [];

document.querySelectorAll('.admin-dashboard').forEach((dashboard, index) => {
	dashboardArray[index] = new AdminDashboard(dashboard, 0);
});
