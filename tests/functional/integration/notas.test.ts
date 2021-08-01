

 enum TestID {
    CATEGORY_LIST_DIV = 'category-list-div',
    CATEGORY_OPTION_DELETE_PERMANENTLY = 'category-option-delete-permanently',
    EDIT_CATEGORY = 'edit-category',
    EMPTY_TRASH_BUTTON = 'empty-trash-button',
    FOLDER_TRASH = 'trash',
    NOTE_LIST = 'note-list',
    NOTE_LINK_ERROR = 'note-link-error',
    NOTE_OPTIONS_NAV = 'note-options-nav',
    NOTE_OPTION_DELETE_PERMANENTLY = 'note-option-delete-permanently',
    NOTE_OPTION_TRASH = 'note-option-trash',
    NOTE_SEARCH = 'note-search',
    NOTE_TITLE = 'note-title-',
    SIDEBAR_ACTION_CREATE_NEW_NOTE = 'sidebar-action-create-new-note',
  }


const campo_escribir = '.CodeMirror textarea'


  const clickTestID = (testIDEnum: TestID) => {
    cy.get('[data-testid="' + testIDEnum + '"]').click()
  }
  
  const clickCreateNewNote = () => {
    clickTestID(TestID.SIDEBAR_ACTION_CREATE_NEW_NOTE)
  }
  
  const typeNoteEditor = (contentToType: string) => {
    // force = true, cypress doesn't support typing in hidden elements
    cy.get('.CodeMirror textarea').type(contentToType, { force: true })
  }
  
  const assertNotesList = (expectedNotes: number) => {
    cy.get('.note-list').children().should('have.length', expectedNotes)
  }
  
  const assertNoteEditorLineCount = (expectedLineCount: number) => {
    cy.get('.CodeMirror-code').children().should('have.length', expectedLineCount)
  }
  
  const assertNoteEditorCharacterCount = (expectedCharacterCount: number) => {

    cy.get('.CodeMirror-code').each((element) => {
        console.log(element)
      expect(element.text().length).to.equal(expectedCharacterCount)
    })
  }

  const wrapWithTestIDTag = (testIDEnum: TestID | string) => {
    return '[data-testid="' + testIDEnum + '"]'
  }
  const clickDynamicTestID = (dynamicTestID: string) => {
    cy.get(wrapWithTestIDTag(dynamicTestID)).click()
  }

  const assertNoteOptionsOpened = () => {
    testIDShouldExist(TestID.NOTE_OPTIONS_NAV)
  }
  const testIDShouldExist = (testIDEnum: TestID) => {
    cy.get(wrapWithTestIDTag(testIDEnum)).should('exist')
  }
  
    

  const getTestID = (testIDEnum: TestID) => {
    return cy.get(wrapWithTestIDTag(testIDEnum))
  }

  const assertNoteListLengthEquals = (expectedLength: number) => {
    getTestID(TestID.NOTE_LIST).children().should('have.length', expectedLength)
  }
  
  const navigateToTrash = () => {
    clickTestID(TestID.FOLDER_TRASH)}
  const clickEmptyTrash = () => {
    clickTestID(TestID.EMPTY_TRASH_BUTTON)}

  const testIDShouldNotExist = (testIDEnum: TestID) => {
    cy.get(wrapWithTestIDTag(testIDEnum)).should('not.exist')
  }



  const getNoteCount = (noteCountAlias: string) => {
    getTestID(TestID.NOTE_LIST).children().its('length').as(noteCountAlias)
  }
  

  const typeNoteSearch = (contentToType: string) => {
    getTestID(TestID.NOTE_SEARCH).type(contentToType, { force: true })
  }

  
  
    

describe('Note app', () => {
    beforeEach(() =>{
        cy.visit("http://localhost:3000/app")
    })

    it('Creando Nuevas notas', () => {

        cy.get('[aria-label="Create new note"]').click()
        cy.get(campo_escribir).type('Texto de una nota')
        cy.get('[aria-label="Create new note"]').click()
        cy.get(campo_escribir).type('texto de otra nota ')
        assertNotesList(3)
    })
      
  it('Creando nota con varias lineas', () => {
    const sampleText = '#l1\nl2\nL3'
    clickCreateNewNote()
    typeNoteEditor(sampleText)
    assertNoteEditorLineCount(3)
    assertNoteEditorCharacterCount(sampleText.replaceAll('\n', '').length)
  })

  it('Mostrar el menu de opciones de una nota', () => {
    cy.get('[aria-label="Create new note"]').click()
    cy.get(campo_escribir).type('Texto de una nota')
    cy.get('[data-testid="note-options-div-0"]').click()
    //clickNoteOptions()
    assertNoteOptionsOpened()
  })

  it('Mostrar el menu de opciones de una nota', () => {
    cy.get('[aria-label="Create new note"]').click()
    cy.get(campo_escribir).type('Texto de una nota')
    cy.get('[data-testid="note-options-div-0"]').click()
    cy.get('[data-testid="note-option-favorite"').click()
    cy.get('[data-testid="favorites"').click()
    assertNoteListLengthEquals(1)
  })

  it('Enviar a la basura', () => {
    cy.get('[aria-label="Create new note"]').click()
    cy.get(campo_escribir).type('Texto de una nota')
    cy.get('[data-testid="note-options-div-0"]').click()
    cy.get('[data-testid="note-option-trash"]').click()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    navigateToTrash()
    assertNoteListLengthEquals(1)
    clickEmptyTrash()
  })

  it('Recuperar de la basura', () => {
    cy.get('[aria-label="Create new note"]').click()
    cy.get(campo_escribir).type('Texto de una nota')
    cy.get('[data-testid="note-options-div-0"]').click()
    cy.get('[data-testid="note-option-trash"]').click()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    navigateToTrash()
    assertNoteListLengthEquals(1)
    cy.get('[data-testid="note-options-div-0"]').click()
    cy.get('[data-testid="note-option-restore-from-trash"').click()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)
    cy.get('[data-testid="notes"').click()
    assertNoteListLengthEquals(2)

  })


  it('Borrar permanentemente', () => {
    cy.get('[aria-label="Create new note"]').click()
    cy.get(campo_escribir).type('Texto de una nota')
    cy.get('[data-testid="note-options-div-0"]').click()
    cy.get('[data-testid="note-option-trash"]').click()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)

    // make sure the new note is in the trash
    navigateToTrash()


    cy.get('[data-testid="note-options-div-0"]').click()
    cy.get('[data-testid="note-option-delete-permanently"]').click()
    testIDShouldNotExist(TestID.NOTE_OPTION_TRASH)
    

  })

  it(' Buscar notas ', function () {
    const noteOneTitle = 'note 1'
    const noteTwoTitle = 'same note title'
    const noteThreeTitle = 'same note title'
    const noteFourTitle = 'note 4'

    // start with a refresh so we know our current saved state
    cy.reload()
    getNoteCount('allNoteStartCount')

    // create a few new notes
    clickCreateNewNote()
    typeNoteEditor(noteOneTitle)
    clickCreateNewNote()
    typeNoteEditor(noteTwoTitle)
    clickCreateNewNote()
    typeNoteEditor(noteThreeTitle)
    clickCreateNewNote()
    typeNoteEditor(noteFourTitle)

    // make sure notes are filtered
    typeNoteSearch('note title')
    cy.then(() => assertNoteListLengthEquals(2))
  })

})

