import React from 'react';
import {ThemeContext} from 'styled-components';

import {categories, recommendations} from '../../mock';
import {Box, ScrollBox} from '../../themes/styled';

import {HorizontalSection} from './HorizontalSection';
import {Category} from './Category';
import {SearchBox} from './SearchBox';
import {Menu} from './Menu';
import {SearchLoader} from './Loader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recomendations: [],
      categories: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
    setTimeout(() => this.setState({loading: false}), 5000);
  }

  fetchData() {
    this.setState({recomendations: recommendations});
    this.setState({categories: categories});
  }

  static contextType = ThemeContext;

  render() {
    const theme = this.context;

    return (
      <ScrollBox bg={theme.colors.background} stickyHeaderIndices={[1]}>
        <HorizontalSection
          loading={this.state.loading}
          label="Rekomendasi di Sekitarmu"
          data={this.state.recomendations}
        />
        {this.state.loading ? (
          <SearchLoader />
        ) : (
          <Box bg={theme.colors.background} py={theme.space.s}>
            <SearchBox placeholder="Cari makan apa hari ini?" />
            <Category data={this.state.categories} />
          </Box>
        )}
        <Menu
          loading={this.state.loading}
          label="Temukan Menu Favoritmu"
          data={this.state.recomendations}
        />
      </ScrollBox>
    );
  }
}

export default Home;
