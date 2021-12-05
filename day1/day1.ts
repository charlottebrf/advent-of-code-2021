const fs = require('fs')

const isBigger = (beforeCurrent, current) => {
    return current > beforeCurrent
} 

const reportOutcome = {
    none: '(N/A - no previous measurement)',
    increased: '(increased)',
    decreased: '(decreased)'
}

const createOutput = (item, outcome) => {
    return `${item} ${outcome}`
}

try {
    const data = fs.readFileSync( "sample-input.txt", 'utf8')
    const report = data.split('\n')
    const finalStrings = [];

    for (const stringifiedNum in report) {
        const itemIndex = parseInt(stringifiedNum);
        const itemBeforeCurrentIndex = itemIndex - 1;
        let finalString

        if (itemBeforeCurrentIndex < 0) {
            finalString = createOutput(report[stringifiedNum], reportOutcome.none)
            finalStrings.push(finalString)
        } else {
            const isItBigger = isBigger(report[itemBeforeCurrentIndex], parseInt(report[stringifiedNum]))
            isItBigger ? finalString = createOutput(report[stringifiedNum], reportOutcome.increased) : finalString = createOutput(report[stringifiedNum], reportOutcome.decreased)
            finalStrings.push(finalString)
        }
    }
      const stringifiedFinalResult = finalStrings.toString()
      try {
        fs.writeFileSync("result.txt", stringifiedFinalResult);
      } catch(err) {
          console.log('my error', err)
      }
    }
   catch (err) {
    console.error(err)
  }
