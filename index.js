class DescriptiveStatistics {
  constructor(data) {
    this.data = data;
  }

  calculateMean() {
    const sum = this.data.reduce((acc, value) => acc + value, 0);
    return sum / this.data.length;
  }

  calculateMedian() {
    const sortedData = [...this.data].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    } else {
      return sortedData[middleIndex];
    }
  }

  calculateMode() {
    const frequencyMap = new Map();
    this.data.forEach((value) => {
      frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
    });

    let mode;
    let maxFrequency = 0;

    frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
        mode = value;
        maxFrequency = frequency;
      }
    });

    return mode;
  }

  calculateRange() {
    const sortedData = [...this.data].sort((a, b) => a - b);
    return sortedData[sortedData.length - 1] - sortedData[0];
  }

  calculateVariance() {
    const mean = this.calculateMean();
    const squaredDifferences = this.data.map((value) =>
      Math.pow(value - mean, 2)
    );
    const sumSquaredDiff = squaredDifferences.reduce(
      (acc, value) => acc + value,
      0
    );
    return sumSquaredDiff / this.data.length;
  }

  calculateStandardDeviation() {
    return Math.sqrt(this.calculateVariance());
  }

  calculateInterquartileRange() {
    const sortedData = [...this.data].sort((a, b) => a - b);
    const lowerQ = this.calculateMedian(
      sortedData.slice(0, Math.floor(sortedData.length / 2))
    );
    const upperQ = this.calculateMedian(
      sortedData.slice(-Math.floor(sortedData.length / 2))
    );
    return upperQ - lowerQ;
  }

  calculateMeanAbsoluteDeviation() {
    const mean = this.calculateMean();
    const absoluteDeviations = this.data.map((value) => Math.abs(value - mean));
    return (
      absoluteDeviations.reduce((acc, value) => acc + value, 0) /
      this.data.length
    );
  }
}

// Examples
const data = [3, 7, 1, 8, 9, 2, 4, 5, 6];
const statsCalculator = new DescriptiveStatistics(data);

console.log('Mean:', statsCalculator.calculateMean());
console.log('Median:', statsCalculator.calculateMedian());
console.log('Mode:', statsCalculator.calculateMode());
console.log('Range:', statsCalculator.calculateRange());
console.log('Variance:', statsCalculator.calculateVariance());
console.log(
  'Standard Deviation:',
  statsCalculator.calculateStandardDeviation()
);
console.log(
  'Interquartile Range:',
  statsCalculator.calculateInterquartileRange()
);
console.log(
  'Mean Absolute Deviation:',
  statsCalculator.calculateMeanAbsoluteDeviation()
);
