import 'jest-extended'

import { MAP_CONTAINS } from '~'

import { expectValidationError } from '../../util'

import { MapTestClass } from './map-test-class'

describe('MapContains', () => {
    describe('mapContains', () => {
        it.each<[unknown]>([[null], [undefined], [new Set()], [new Map([[42, 'bla']])]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({ mapContains: value }), {
                    property: 'mapContains',
                    constraint: MAP_CONTAINS,
                    message: 'mapContains must contain $constraint1 values',
                })
            }
        )
    })

    describe('eachMapContains', () => {
        it.each<[unknown[]]>([[[null]], [[undefined]], [[new Set()]], [[new Map([[42, 'bla']]), new Map()]]])(
            'should fail validation for %p',
            value => {
                expectValidationError(new MapTestClass({ eachMapContains: value }), {
                    property: 'eachMapContains',
                    constraint: MAP_CONTAINS,
                    message: 'each value in eachMapContains must contain $constraint1 values',
                })
            }
        )
    })
})
