import 'jest-extended'

import {MAP_NOT_EMPTY} from '../../../src'
import {expectValidationError} from '../../util'

import {MapTestClass} from './map-test-class'

describe('MapNotEmpty', () => {
    describe('mapNotEmpty', () => {
        it.each<[unknown]>([[null], [undefined], [new Map()]])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({mapNotEmpty: value}), {
                property: 'mapNotEmpty',
                constraint: MAP_NOT_EMPTY,
                message: 'mapNotEmpty should not be an empty map',
            })
        })
    })

    describe('eachMapNotEmpty', () => {
        it.each<[unknown[]]>([[[BigInt(10), 42]], [[undefined]], [[new Map()]], [[new Map([['k', 'v']]), new Map()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({eachMapNotEmpty: value}), {
                    property: 'eachMapNotEmpty',
                    constraint: MAP_NOT_EMPTY,
                    message: 'each value in eachMapNotEmpty should not be an empty map',
                })
            }
        )
    })
})
