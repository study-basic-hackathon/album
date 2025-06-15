import { Route, Routes } from 'react-router';
import Home from './features/Home';
import Layout from './parts/Layout';

import ExhibitionCollection from './features/exhibition/ExhibitionCollection';
import NewExhibition from './features/exhibition/NewExhibition';
import ExhibitionSingle from './features/exhibition/ExhibitionSingle';
import NewExhibitionWork from './features/exhibition/NewExhibitionWork';
import ExhibitionWorkSingle from './features/exhibition/ExhibitionWorkSingle';

import ArrangerCollection from './features/arranger/ArrangerCollection';
import NewArranger from './features/arranger/NewArranger';
import ArrangerSingle from './features/arranger/ArrangerSingle';

import MaterialCollection from './features/material/MaterialCollection';
import NewMaterial from './features/material/NewMaterial';
import MaterialSingle from './features/material/MaterialSingle';

import CategoryCollection from './features/category/CategoryCollection';
import NewCategory from './features/category/NewCategory';
import CategorySingle from './features/category/CategorySingle';

import SeasonCollection from './features/season/SeasonCollection';
import NewSeason from './features/season/NewSeason';
import SeasonSingle from './features/season/SeasonSingle';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" Component={Home} />

        <Route path="/exhibitions" Component={ExhibitionCollection} />
        <Route path="/exhibitions/new" Component={NewExhibition} />
        <Route path="/exhibitions/:exhibitionId" Component={ExhibitionSingle} />
        <Route path="/exhibitions/:exhibitionId/works/new" Component={NewExhibitionWork} />
        <Route path="/exhibitions/:exhibitionId/works/:workId" Component={ExhibitionWorkSingle} />

        <Route path="/arrangers" Component={ArrangerCollection} />
        <Route path="/arrangers/new" Component={NewArranger} />
        <Route path="/arrangers/:arrangerId" Component={ArrangerSingle} />

        <Route path="/materials" Component={MaterialCollection} />
        <Route path="/materials/new" Component={NewMaterial} />
        <Route path="/materials/:materialId" Component={MaterialSingle} />

        <Route path="/categories" Component={CategoryCollection} />
        <Route path="/categories/new" Component={NewCategory} />
        <Route path="/categories/:categoryId" Component={CategorySingle} />

        <Route path="/seasons" Component={SeasonCollection} />
        <Route path="/seasons/new" Component={NewSeason} />
        <Route path="/seasons/:seasonId" Component={SeasonSingle} />
      </Routes>
    </Layout>
  );
}

export default App;
