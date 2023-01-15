describe('Home Page', () => {
  it('should loads successfully', () => {
    cy.visit('/');

    cy.get('h1').contains('Home Page');
  });
});

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('/');

    cy.get('a[href*="about"]').click();
    cy.url().should('include', '/about');
    cy.get('h1').contains('About Page');
  });
});

export {};
