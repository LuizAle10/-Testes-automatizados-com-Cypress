
  /*
    O lodash é uma biblioteca famosa no mundo JavaScript, com diversas funções utilitárias.
    E o legal é que o Cypress já empacota o lodash junto com ele, através do módulo Cypress._.
    */

    Cypress._.times(3, function() { //obloco vai ser executado ex: 3 vezes nesse caso
      it.only('testa a página da política de privavidade de forma independente', function() {
          cy.visit('./src/privacy.html')
          
          cy.contains('Talking Aboult Testing')
          .should('be.visible')
          })
      })