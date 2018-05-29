// 当前周次的类，用于获取当前周的起止日期
export default class WeekDate{
  constructor(){
    let now  = new Date() //当前日期
    this.nowYear= now.getFullYear()
    this.nowMonth = now.getMonth()
    this.nowDay = now.getDate()
    this.nowDayOfWeek=now.getDay()
    this.noewDayOfWeek = this.nowDayOfWeek ===0?7:this.nowDayOfWeek
  }

  formatDate(date){
    let mymonth = date.getMonth()+1
    let myweekday = date.getDate()
    return `${mymonth}月${myweekday}日`
  }

  getWeekStartDate(){
    let weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + 1)
    return this.formatDate(weekStartDate)
  }
  getWeekEndDate() {
    let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek + 1))
    return this.formatDate(weekEndDate)
  }
}

