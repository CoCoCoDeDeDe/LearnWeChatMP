// 数量格式化
export function formatNum(num) {
  if (num === 0) return '0'; // 处理0值
  if (num < 0) return '-' + numToKw(-num); // 处理负数
  
  const units = [
      { threshold: 10000, unit: 'w' }, // 万单位
      { threshold: 1000, unit: 'k' }    // 千单位
  ];

  return units.reduce((acc, { threshold, unit }) => {
      if (acc[0] >= threshold) {
          const value = (acc[0] / threshold).toFixed(1);
          return [parseFloat(value), `${value.replace(/\.0$/, '')}${unit}`];
      }
      return acc;
  }, [num, num.toString()])[1];
}

// 时间戳转"MM-DD"
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份补零
  const day = date.getDate().toString().padStart(2, '0'); // 日期补零
  return `${month}-${day}`;
}
