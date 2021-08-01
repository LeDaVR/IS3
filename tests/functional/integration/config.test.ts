
const navigateToSettings = () => {
    cy.findByRole('button', { name: /settings/i }).click()
  }

describe('Note app', () => {
    beforeEach(() =>{
        cy.visit("http://localhost:3000/app")
        navigateToSettings()
    })

  it('Abrir el menu settings', () => {
    cy.get('.settings-modal').should('exist')
  })

  it('Cerrar el menu settings', () => {
    cy.get('.close-button').click()
    cy.get('.settings-modal').should('not.exist')
    cy.findByRole('button', { name: /settings/i }).click()
  })

  const closeSettingsByClickingOutsideWindow = () => {
    cy.get('.dimmer').click('topLeft')
  }
  const assertSettingsMenuIsClosed = () => {
    cy.get('.settings-modal').should('not.exist')
  }
  const navigateToSettings = () => {
    cy.findByRole('button', { name: /settings/i }).click()
  }

  it('Cerrar la configuracion haciendo click fuera del recuadro', () => {
    closeSettingsByClickingOutsideWindow()
    assertSettingsMenuIsClosed()
    navigateToSettings()
  })

})