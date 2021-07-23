import React, {useState} from 'react';
import {MenuVariantType} from 'models/menuType';
import {Box, Checkbox, Heading, HStack, Radio, Text, VStack} from 'native-base';
import {currencyFormat} from 'utils';
import {CartItemType, ExtrasItemType, ExtrasType} from 'models/merchantType';

type OptionProps = {
  extras?: ExtrasType[];
  setExtras: React.Dispatch<React.SetStateAction<ExtrasType[]>>;
  variant: MenuVariantType;
  cart?: CartItemType;
};

const SingleOption = ({extras, setExtras, variant, cart}: OptionProps) => {
  const handleOptionChange = (value: string) => {
    const strArr = value.split('-');
    const groupId = strArr[0];
    const itemId = strArr[1];
    const price = strArr[2];

    const newExtras = extras?.filter(item => item.groupId !== groupId)!!;
    setExtras([
      ...newExtras,
      {
        groupId,
        items: [
          {
            itemId,
            price,
          },
        ],
      },
    ]);
  };

  let defaultValue = '';
  const select = cart?.extras.filter(
    extra => extra.groupId === variant.id.toString(),
  )[0];
  if (select) {
    const itemId = select.items[0].itemId;
    const price = select.items[0].price || 0;
    defaultValue = `${variant.id}-${itemId}-${price}`;
  }

  return (
    <Radio.Group
      defaultValue={defaultValue}
      name={variant.id.toString()}
      colorScheme="red"
      onChange={handleOptionChange}>
      {variant.item.map(item => (
        <Box
          key={item.id}
          borderBottomWidth={1}
          borderBottomColor="muted.100"
          mb={1}
          pr={5}>
          <Radio
            value={`${variant.id}-${item.id}-${item.price || 0}`}
            my={1}
            pl={1}
            accessibilityLabel={item.name}>
            <HStack justifyContent="space-between" width={'100%'} pl={2}>
              <Text fontSize="sm">{item.name}</Text>
              <Text fontSize="sm">
                {item.price ? `+ ${currencyFormat(item.price)}` : ''}
              </Text>
            </HStack>
          </Radio>
        </Box>
      ))}
    </Radio.Group>
  );
};

const MultipleOption = ({cart, extras, setExtras, variant}: OptionProps) => {
  const [lastGroupId, setLastGroupId] = useState<string>();

  const handleChange = (values: string[]) => {
    let groupId: string = '';

    const items = values.map(value => {
      const strArr = value.split('-');
      groupId = strArr[0];

      const itemId = strArr[1];
      const price = strArr[2];

      return {
        itemId,
        price,
      } as ExtrasItemType;
    });

    if (groupId !== '') {
      const newExtras = extras?.filter(
        item => item.groupId !== groupId && item.groupId !== '',
      )!!;
      setExtras([
        ...newExtras,
        {
          groupId,
          items: [...items],
        },
      ]);
      setLastGroupId(groupId);
    } else {
      const newExtras = extras?.filter(item => item.groupId !== lastGroupId)!!;
      setExtras(newExtras);
    }
  };

  let defaultValues: string[] = [];
  if (cart) {
    const select = cart?.extras.filter(
      extra => extra.groupId === variant.id.toString(),
    )[0];
    if (select) {
      const items = select.items;
      defaultValues = items?.map(item => {
        return `${variant.id}-${item.itemId}-${item.price || 0}`;
      });
    }
  }

  return (
    <Checkbox.Group
      defaultValue={defaultValues}
      colorScheme="red"
      onChange={handleChange}>
      {variant.item.map(item => (
        <Box
          key={item.id}
          borderBottomWidth={1}
          borderBottomColor="muted.100"
          mb={1}
          pr={5}>
          <Checkbox
            value={`${variant.id}-${item.id}-${item.price || 0}`}
            my={1}
            pl={'5px'}
            accessibilityLabel={item.name}>
            <HStack justifyContent="space-between" width={'100%'} pl={'10px'}>
              <Text fontSize="sm">{item.name}</Text>
              <Text fontSize="sm">
                {item.price ? `+ ${currencyFormat(item.price)}` : ''}
              </Text>
            </HStack>
          </Checkbox>
        </Box>
      ))}
    </Checkbox.Group>
  );
};

type Props = {
  variants: MenuVariantType[];
  cart?: CartItemType;
  extras?: ExtrasType[];
  setExtras: React.Dispatch<React.SetStateAction<ExtrasType[]>>;
};

export const Variant = ({cart, extras, variants, setExtras}: Props) => {
  return (
    <VStack space={2} m={4}>
      {variants?.map((variant, index) => (
        <VStack space={2} key={variant.id}>
          <HStack
            space={2}
            justifyContent="space-between"
            alignItems="baseline">
            <Heading size="sm">{variant.name}</Heading>
            <HStack reversed space={2}>
              {variant.isSingle ? (
                <Text fontSize="xs" color="muted.500">
                  Pilih salah satu {!variant.isRequired && '(Opsional)'}
                </Text>
              ) : (
                <Text fontSize="xs" color="muted.500">
                  Pilih beberapa {!variant.isRequired && '(Opsional)'}
                </Text>
              )}
            </HStack>
          </HStack>
          {variant.isSingle ? (
            <SingleOption
              cart={cart}
              extras={extras}
              setExtras={setExtras}
              variant={variant}
              key={index}
            />
          ) : (
            <MultipleOption
              cart={cart}
              extras={extras}
              setExtras={setExtras}
              variant={variant}
              key={index}
            />
          )}
        </VStack>
      ))}
    </VStack>
  );
};
