import axios from 'axios'
import moment from 'moment'

/**
 * Class containing helper functions
 */
class Helper {
  /**
   * Verifies if it is a valid email
   * 
   * @param {String} email
   * @returns {Boolean} 
   */
  checkEmail (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  }

  /**
   * Verifies if it is a valid email allowing empty string
   * 
   * @param {String} email
   * @returns {Boolean} 
   */
  checkEmptyOrValidEmail (email) {
    return ['', undefined, null].includes(email) || this.checkEmail(email)
  }

  /**
   * Count characters of a string according to a given number
   * 
   * @param {String} str 
   * @param {Number} len
   * @returns {Boolean}
   */
  countLength (str = '', len = 0) {
    return String(str).length >= parseInt(len, 10)
  }

  /**
   * Validates a single CNPJ
   * 
   * @param {String} cnpj 
   * @returns {Boolean}
   */
  validatesCNPJ (cnpj) {
    if (cnpj === null || cnpj === undefined) return
    if (cnpj.length !== 14) return false
 
    // Discard invalid CNPJs
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false
         
    // Validates last two digits (verification digits)
    let size = cnpj.length - 2
    let numbers = cnpj.substring(0, size)
    let digits = cnpj.substring(size)
    let sum = 0
    let position = size - 7

    // Do first calculation
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * position--
      if (position < 2) position = 9
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (result != digits.charAt(0)) return false
    
    // After validating first digit, redifine variables and redo calculation for last digit
    size = size + 1
    numbers = cnpj.substring(0,size)
    sum = 0
    position = size - 7
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * position--
      if (position < 2) position = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1)) return false;
    
    // If everything's ok...
    return true;
  }

  /**
   * Display a phone number following a brazilian pattern
   * 
   * @param {String} number
   * @returns {String | null}
   */
  displayPhoneNumber (number) {
    let cleaned = String(number).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : null
  }

  /**
   * Format a phone number to be persisted in a database
   * 
   * @param {String} number
   * @returns {String} 
   */
  formatPhoneNumber (number) {
    return String(number).replace(/[^0-9]/ig, '')
  }

  /**
   * Display an agency number following a brazilian pattern
   * 
   * @param {String} number
   * @returns {String | null}
   */
  formatAgencia (number) {
    let cleaned = String(number).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{1})$/)
    return match ? `${match[1]}-${match[2]}` : null
  }

  /**
   * Display a bank account number following a brazilian pattern
   * 
   * @param {String} number
   * @returns {String | null}
   */
  formatConta (number) {
    let cleaned = String(number).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{2})(\d{3})(\d{1})$/)
    return match ? `${match[1]}.${match[2]}-${match[3]}` : null
  }

  /**
   * Display a CNPJ number following a brazilian pattern
   * 
   * @param {String} number
   * @returns {String | null}
   */
  formatCNPJ (number) {
    let cleaned = String(number).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/)
    return match ? `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}` : null
  }

  /**
   * Display a date following a brazilian pattern
   * 
   * @param {String} number
   * @returns {String | null}
   */
  formatDate (date) {
    return moment(date).format('DD/MM/YYYY')
  }

  /**
   * Format an HTML list of errors from backend
   * 
   * @param {Array} errors 
   * @returns {String | null}
   */
  formatErrors (errors) {
    let text = '';
    errors.forEach(value => {
      text += `<li class="text-xs-left ml-5 error-style">${value.message}</li>`
    })
    return text;
  }

  /**
   * Make an API request to correios.com.br and gets the address
   * 
   * @param {String} cep 
   * @returns {String}
   */
  getAddressByCEP (cep) {
    return new Promise((resolve, reject) => {
      const viaCepUrl = `https://viacep.com.br/ws/${cep}/json/`
      axios.get(viaCepUrl)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$utils = new Helper();
  }
};