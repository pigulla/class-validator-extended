import 'jest-extended'

import { IS_NETWORK_PORT, IsNetworkPort, isNetworkPort } from '~'
import { expectValidationError } from '~test/util'

jest.mock('~/number/is-network-port/is-network-port.predicate')

describe('@IsNetworkPort', () => {
    const mockedIsNetworkPort = isNetworkPort as unknown as jest.Mock

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

    beforeEach(() => {
        mockedIsNetworkPort.mockReturnValue(false)
    })

    for (const [message, optionsList] of Object.entries(matrix)) {
        describe(`should return the error message "${message}"`, () => {
            const value = Symbol('value')

            it.each<[Options]>(optionsList.map(item => [item]))('when called with options %j', options => {
                class TestClass {
                    @IsNetworkPort(...options)
                    property: unknown = value
                }

                expectValidationError(new TestClass(), {
                    property: 'property',
                    constraint: IS_NETWORK_PORT,
                    message,
                })
                expect(mockedIsNetworkPort).toHaveBeenCalledWith(value, {
                    allow_system_allocated: options[0]?.allow_system_allocated ?? true,
                    allow_system_ports: options[0]?.allow_system_ports ?? true,
                })
            })
        })
    }
})
