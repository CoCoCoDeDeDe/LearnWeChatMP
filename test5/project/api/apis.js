import { request } from "../utils/request"

// 获取首页导航
export function listNav() {
  return request({
    url: "/nav/get",
    method: "POST"
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

// 获取新闻 detail
export function newsDetail(data) {
  return request({
    url: "/news/detail",
    method: "POST",
    data: data
  })
}

// 获取产品列表
export function queryProduct(data) {
  return request({
    url: "/product/getlist",
    method: "POST",
    data: data
  })
}

// 获取产品 detail
export function proDetail(data) {
  return request({
    url: "/product/detail",
    method: "POST",
    data: data
  })
}