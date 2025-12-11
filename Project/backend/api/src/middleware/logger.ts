class Logger {

    getDate() {
      const date = new Date();
      return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(`, `,``);
    }
  
    getPID() {
      return process.pid;
    }
  
    info(message: string) {
      console.log(`${this.getDate()} - ${this.getPID()} - ${message}`);
    }
  
    error(message: string) {
      console.log(`${this.getDate()} - ${this.getPID()} - ${message}`);
    }
  
    warn(message: string) {
      console.log(`${this.getDate()} - ${this.getPID()} - ${message}`);
    }
  
    debug(message: string) {
      console.log(`${this.getDate()} - ${this.getPID()} - ${message}`);
    }
  
    log(message: string) {
      console.log(`${this.getDate()} - ${this.getPID()} - ${message}`);
    }
  }
  
  export default Logger;