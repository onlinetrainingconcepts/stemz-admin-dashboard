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
				const accordionButtons = accordionContent.querySelectorAll(
					'.dashboard__accordion--button'
				);

				accordionButtons.forEach((btn) => {
					// variables
					const tabNumber = btn.dataset.forTab;
					const tabToActivate = this.contentContainer.querySelector(
						`.tabcontent[data-tab="${tabNumber}"]`
					);

					// adds event listeners to each accordion button
					btn.addEventListener('click', () => {
						// removes active class for all accordion buttons
						accordionButtons.forEach((btn) => {
							btn.classList.remove('active');
						});

						// removes active classes for all tabconent sections
						this.contentContainer
							.querySelectorAll('.tabcontent')
							.forEach((tab) => {
								tab.classList.remove('tabcontent--active');
							});

						// adds active class to current button
						btn.classList.add('active');
						// adds active class to tabToActivate tab
						tabToActivate.classList.add(`tabcontent--active`);
					});
				});

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
