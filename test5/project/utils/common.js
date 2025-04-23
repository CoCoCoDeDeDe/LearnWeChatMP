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

export function formatTimestamp_2(timestamp) {
  // 处理无效时间戳（非数字/0值）
  if (isNaN(timestamp) || timestamp === 0) return '0000-00-00 00:00';
  
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
  const day = String(date.getDate()).padStart(2, '0'); // 日期补零
  const hours = String(date.getHours()).padStart(2, '0'); // 小时补零
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟补零

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}