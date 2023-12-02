import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/hooks';
import { Brand } from '@/components';
import { setDefaultTheme } from '@/store/theme';
import { ApplicationScreenProps } from '@appTypes/navigation';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.center]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.marginVerticalTiny]} />
    </View>
  );
};

export default Startup;
