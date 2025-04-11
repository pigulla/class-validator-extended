import assert from 'node:assert'
import { describe, after, mock, afterEach } from 'node:test'

import { IsNetworkPort, IS_NETWORK_PORT } from '../../../src'
import { expectValidationError, itEach } from '../../util'

describe('@IsNetworkPort', () => {
    type Options = Parameters<typeof IsNetworkPort>

    const matrix: Record<string, Options[]> = {
        'property must be a network port': [[], [undefined], [{}]],
        'each value in property must be a network port': [[{ each: true }]],
        'property must be a static network port': [[{ allow_system_allocated: false }]],
        'each value in property must be a static network port': [[{ allow_system_allocated: false, each: true }]],
        'property must be a non-system network port': [[{ allow_system_ports: false }]],
        'each value in property must be a non-system network port': [[{ allow_system_ports: false, each: true }]],
        'property must be a static non-system network port': [
            [{ allow_system_allocated: false, allow_system_ports: false }],
        ],
        'each value in property must be a static non-system network port': [
            [{ allow_system_allocated: false, allow_system_ports: false, each: true }],
        ],
    }

    const mockedIsNetworkPort = mock.fn(() => false)
    const mockedModule = mock.module('../../../src/number/is-network-port/is-network-port.predicate.ts', {
        namedExports: {
            isNetworkPort: mockedIsNetworkPort,
        },
    })
    const { IsNetworkPort: Decorator, IS_NETWORK_PORT: SYMBOL } =
        require('../../../src/number/is-network-port/is-network-port.decorator') as {
            IsNetworkPort: typeof IsNetworkPort
            IS_NETWORK_PORT: typeof IS_NETWORK_PORT
        }

    afterEach(() => mockedIsNetworkPort.mock.resetCalls())
    after(() => mockedModule.restore())

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            itEach<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @Decorator(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: SYMBOL,
                    message,
                })
                assert.equal(mockedIsNetworkPort.mock.callCount(), 1)
                assert.deepEqual(mockedIsNetworkPort.mock.calls[0].arguments, [
                    value,
                    {
                        allow_system_allocated: options[0]?.allow_system_allocated ?? true,
                        allow_system_ports: options[0]?.allow_system_ports ?? true,
                    },
                ])
            })
        })
    }
})
