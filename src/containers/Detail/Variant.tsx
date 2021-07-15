import React from 'react';
import {Box, Heading, HStack, Radio, Text, VStack} from 'native-base';
import {Separator} from 'components';
import {VariantType} from 'models/menu/type';
import {currencyFormat} from 'utils';

export const Variant = ({variants}: {variants: VariantType[]}) =>
  variants.length > 0 ? (
    <VStack>
      <Separator height={2} bg="gray.100" my={2} />
      {variants.map(variant => (
        <VStack px={4} space={2}>
          <Box>
            <Heading size="sm" my={2}>
              {variant.name}
            </Heading>
            <Radio.Group name={`group${variant.id}`}>
              <VStack space={3} width={'100%'} mx={2}>
                {variant.item.map(item => (
                  <Radio value={item.id.toString()} accessibilityLabel="Varian">
                    <HStack alignItems="center">
                      <Text fontSize="sm" flex={1} ml={3}>
                        {item.name}
                      </Text>
                      <Text fontSize="sm" textAlign="right" mr={4}>
                        {item.price ? currencyFormat(item.price) : ''}
                      </Text>
                    </HStack>
                  </Radio>
                ))}
              </VStack>
            </Radio.Group>
          </Box>
        </VStack>
      ))}
      <Separator height={2} />
    </VStack>
  ) : null;
