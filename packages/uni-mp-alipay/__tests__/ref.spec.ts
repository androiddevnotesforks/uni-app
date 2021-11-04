import { assert } from './testUtils'

describe('mp-alipay: transform ref', () => {
  test('without ref', () => {
    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom/><custom/><custom1/>`,
      `<custom u-i="2a9ec0b0-0" onVI="__l"/><custom u-i="2a9ec0b0-1" onVI="__l"/><custom1 u-i="2a9ec0b0-2" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('static ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom ref="__r" data-r="custom" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom a:for="{{a}}" a:for-item="item" ref="__r" data-r-i-f="custom" u-i="{{item.a}}" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom ref="__r" data-r="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`
    )
    assert(
      `<custom v-for="item in items" :ref="custom"/>`,
      `<custom a:for="{{a}}" a:for-item="item" ref="__r" data-r-i-f="{{b}}" u-i="{{item.a}}" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }), b: _ctx.custom }
}`
    )
  })
})
