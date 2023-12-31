import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import header from '../support/components/header'
// import { contains } from 'cypress/types/jquery'

describe('login', () => {

  context('quando submeto o formulário', () => {
    it('deve logar com sucesso', () => {
      const user = {
        name: 'Eliel',
        email: 'eliel.cirilo@gmail.com',
        password: 'senhasxp13'
      }

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldBeLoggerdIn(user.name)
    })

    it('não deve logar com senha incorreta', () => {
      const user = {
        name: 'Eliel',
        email: 'eliel.cirilo@gmail.com',
        password: '123456'
      }

      loginPage.submit(user.email, user.password)

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.noticeShouldBe(message)
    })

    it('não deve logar com email não cadastrado', () => {
      const user = {
        name: 'Eliel',
        email: 'eliel.cirilo@404.com',
        password: '123456'
      }

      loginPage.submit(user.email, user.password)

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.noticeShouldBe(message)
    })

    it('campos obrigatórios', () => {
      loginPage.submit()
      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
    })
  })

  context('senha muito curta', () => {
    
    const passwords = [
      '1',
      '12',
      '123',
      '1234',
      '12345'
    ]

    passwords.forEach((p)=> {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit('eliel.cirilo@gmail.com', p)
        loginPage.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('email no formato incorreto', () => {
    
    const emails = [
      'eliel&gamil.com',
      'eliel.com.br',
      '@gmail.com',
      '@',
      'eliel@',
      '123321',
      'xpte123'
    ]

    emails.forEach((e)=> {
      it(`não deve logar com o email: ${e}`, () => {
        loginPage.submit(e, 'senhasxp13')
        loginPage.alertShouldBe('Informe um email válido')
      })
    })
  })

})
