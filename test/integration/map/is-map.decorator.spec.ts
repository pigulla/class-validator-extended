import 'jest-extended'

import { IS_MAP } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('IsMap', () => {
    describe('isMap', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()]])('should fail validation for %p', value => {
            expectValidationError(new MapTestClass({ isMap: value }), {
                property: 'isMap',
                constraint: IS_MAP,
                message: 'isMap must be a Map instance',
            })
        })
    })

    describe('eachIsMap', () => {
        it.each<[unknown[]]>([[[null]], [[undefined]], [[new Set()]], [[new Map(), new Set()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({ eachIsMap: value }), {
                    property: 'eachIsMap',
                    constraint: IS_MAP,
                    message: 'each value in eachIsMap must be a Map instance',
                })
            }
        )
    })
})
