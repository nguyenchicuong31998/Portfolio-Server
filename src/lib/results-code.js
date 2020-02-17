

class ResultsCode extends Error{
   constructor(name, detailMessage){
        super(name);
        this.detailMessage = detailMessage;
   }
}

module.exports = ResultsCode;