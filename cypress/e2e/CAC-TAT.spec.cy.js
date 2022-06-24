describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000//Para não ficar inserindo os segundos toda vez que for usar o cy.tick eu cro essa váriavel 

  beforeEach(function() {
    cy.visit('./src/index.html')   
  });

  it('verificar o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


it('preencha os campos obrigatórios e envia o formulário', function() {
  const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
  

//usando cy.clock com cy.tick
  cy.clock() //congelar relógio do navegador

  cy.get('#firstName').type('Curso')
  cy.get('#lastName').type('TAT')
  cy.get('#email').type('CursoTAT@teste.com')
  cy.get('#open-text-area').type(longText, { delay: 0 }) //para textos muito grande s uma alternativa para o texte ser mais rápido { delay:0}
  //cy.get('button[type="submit"]').click()
  cy.contains('button', 'Enviar').click() //encontrar um texto especifico do elemento(texto button) que tem o texto enviar e vou clicar nele

  cy.get('.success').should('be.visible')  

//usando cy.clock com cy.tick
  cy.tick(THREE_SECONDS_IN_MS) //passei uma váriavel de 3 segundos

  cy.get('.success').should('not.be.visible')
})

it('exibe mensagem de erro ao submeter o formulário com um email com formatação incorreta', function() {
  
  cy.clock()

  cy.get('#firstName').type('Curso')
  cy.get('#lastName').type('TAT')
  cy.get('#email').type('CursoTAT@teste,com')
  cy.get('#open-text-area').type('Teste')
  cy.get('button').click()
  
  cy.get('.error').should('be.visible')

  cy.tick(THREE_SECONDS_IN_MS)

  cy.get('.error').should('not.be.visible')
})

Cypress._.times(3, function() { //Rodar teste várias vezes para provar que ele é estável
it('campo de telefone continua vazio quando preenchido com valor não-numérico', function() {
  cy.get('#phone')
    .type('abcdefghij') //Não digita pois o campo só aceita números
    .should('have.value', '') //Validando se o campo ficou vazio pois não aceita letras
})
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
  cy.get('#firstName').type('Curso')
  cy.get('#lastName').type('TAT')
  cy.get('#email').type('CursoTAT@teste,com')
  cy.get('#phone-checkbox').check()//depois que seleciona o campo de telefone se torna obrigatório
  cy.get('#open-text-area').type('Teste')
  cy.get('button').click()
  
  cy.get('.error').should('be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
  cy.get('#firstName')
    .type('Teste')
    .should('have.value', 'Teste') //validando se o campo está com o nome correto 
    .clear()
    .should('have.value', '') //validando se o campo está vazio
  cy.get('#lastName')
    .type('Testando')
    .should('have.value', 'Testando') //validando se o campo está com o nome correto 
    .clear()
    .should('have.value', '') //validando se o campo está vazio
  cy.get('#email')
    .type('CursoTAT@teste.com')
    .should('have.value', 'CursoTAT@teste.com') //validando se o campo está com o nome correto 
    .clear()
    .should('have.value', '') //validando se o campo está vazio
  cy.get('#phone')
    .type('123456789')
    .should('have.value', '123456789') //validando se o campo está com o nome correto 
    .clear()
    .should('have.value', '') //validando se o campo está vazio
})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
  cy.clock()
  
  cy.get('button').click()
  
  cy.get('.error').should('be.visible')

  cy.tick(THREE_SECONDS_IN_MS)

  cy.get('.error').should('not.be.visible')
})


//usando comandos criados do arquivo commands
it('envia o formulário com sucesso usando um comando customizado', function() {
  cy.clock()

  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')

  cy.tick(THREE_SECONDS_IN_MS)

  cy.get('.success').should('not.be.visible')

})

//Seleções suspensas

it('seleciona um produto (YouTube) por seu texto', function() {
  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', function() {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  
})

it('seleciona um produto (Blog) por seu índice', function(){
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
})

//Marcar inputs do tipo radio
it('marca o tipo de atendimento "Feedback"', function() {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
})

it('marca cada tipo de atendimento', function() {
  cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio) {
  cy.wrap($radio).check()//empacota os argumentos anteriores
  cy.wrap($radio).should('be.checked')//marca e vai verificando quem foi marcado
  })
})

//Marcar Check Box
it('marca ambos checkboxes, depois desmarca o último', function() {
  cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked') //Verificar que ambos está marcado
    .last()//dos dois selecionados pega só o ultimo
    .uncheck() //garantir que está desmarcando
    .should('not.be.checked') //validando que não está mais checado

})

//Upload de arquivos
it('seleciona um arquivo da pasta fixtures', function() {
  cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    //console.log($input)
    })
  })

    //simulando que está arrastando  arquivo
    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
      })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Links qua abrem em outras abas do navegador
  
    /*confie que o navegador funciona (teste a aplicação, não o browser)
    Ou seja, se um elemento do tipo âncora (a) possui o atributo target com o valor _blank, quando clicado, obrigatóriamente o valor do atributo href será aberto em uma nova aba. Este é o compartamento padrão em qualquer navegador.
    Neste caso, podemos simplesmente verificar tal característica, sem nem mesmo precisar clicar no elemento.
    */

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr','target', '_blank')
   })

   it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
       
    cy.contains('Talking About Testing').should('be.visible')
   })

   it('testa a página da política de privavidade de forma independente', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
       
    cy.contains('Talking About Testing').should('be.visible')
   })

   //Simulando o viewport de um dispositivo móvel
   
it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show') //faz aparecer a mensagem na tela
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide') //esconde a mensagem na tela
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show') //faz aparecer a mensagem na tela
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide') //esconde a mensagem na tela
    .should('not.be.visible')
  })

it('preenche a area de texto usando o comando invoke', function() {
  const longText = Cypress._.repeat('0123456789', 20) //repete o texto 20 vezes

  cy.get('#open-text-area')
    .invoke('val', longText)
    .should('have.value', longText) //verificar que é o valor realmente
   })

   
it('faz uma requisição HTTP', function() {
  cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response) {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT') //verificar em algum lugar do html o texto
      //console.log() //verificar os status retornados 
    })
})

it('encontra o gato escondido', function() {
  cy.get('#cat')
    .invoke('show')
    .should('be.visible')
  cy.get('#title') 
    .invoke('text', 'CAT TAT') //Mudar texto na tela
  cy.get('#subtitle')
    .invoke('text', 'Eu amo 💚 gatos!') //Mudar texto na tela => coração do site emojipedia
  
  })
})




