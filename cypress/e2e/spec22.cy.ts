describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:5000');

    cy.get('#task_new', {timeout: 160000})
  })
})