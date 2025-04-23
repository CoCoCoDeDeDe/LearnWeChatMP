import { request } from "../utils/request"

// 获取首页导航
export function listNav() {
  return request({
    url: "/nav/get",
    method: "POST",
  })
}

// 获取新闻列表
export function queryNews(data) {
  return request({
    url: "/news/get",
    method: "POST",
    data: data
  })
}