const paintingLocations = [
  {
    name: "View of the Grand Canal",
    lat: 45.431019,
    lng: 12.334823,
    imageUrl: "images/ef1f442c-24bf-40c8-a82b-e89b71c66ecf_3000.jpg",
    details: "(c1743) by Bernardo Bellotto. <br><br> From the <a href='https://www.getty.edu/art/collection/object/103RJP#full-artwork-details'>Getty's Collection Online</a>.",
  },
  {
    name: "A View of Paris with the Ile de la Cité",
    lat: 48.8549502,
    lng: 2.3468266,
    imageUrl: "images/ef390b6c-6021-4738-92fe-2338c38cc2af_3000.jpg",
    details: "(c1763) by Jean-Baptiste Raguenet. <br><br> From the <a href='https://www.getty.edu/art/collection/object/103RBA'>Getty's Collection Online</a>.",
  },
  {
    name: "View of the Arch of Constantine with the Colosseum",
    lat: 41.8902102,
    lng: 12.4922309,
    imageUrl: "images/c2819e28-3aa1-45f9-8b16-63fd41f7c39c_3000.jpg",
    details: "(1742–1745) by Canaletto. <br><br> From the <a href='https://www.getty.edu/art/collection/object/103RAX'>Getty's Collection Online</a>.",
  },
  {
    name: "Houses of Parliament, London",
    lat: 51.4994794,
    lng: -0.1248092,
    imageUrl: "images/Parliament.jpg",
    details: "(1900-1901) by Claude Monet. <br><br> From the <a href='https://www.artic.edu/artworks/16584/houses-of-parliament-london'>Art Institute of Chicago</a>.",
  },
  {
    name: "Salisbury Cathedral from Lower Marsh Close",
    lat: 51.0649702,
    lng: -1.7971855,
    imageUrl: "images/salisbury_cathedral_from_lower_marsh_close_1937.1.108.jpg",
    details: "(1820) by John Constable. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.115.html'>National Gallery of Art</a>.",
  },
  {
    name: "Argenteuil",
    lat: 48.9402087,
    lng: 2.2528139,
    imageUrl: "images/argenteuil_1970.17.42.jpg",
    details: "(1872) by Claude Monet. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.52186.html'>National Gallery of Art</a>.",
  },
  {
    name: "Niagara",
    lat: 43.078697,
    lng: -79.0763802,
    imageUrl: "images/niagara_2014.79.10.jpg",
    details: "(1857) by Frederic Edwin Church. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.166436.html'>National Gallery of Art</a>.",
  },
  {
    name: "High Bridge at Night, New York City",
    lat: 40.8422517,
    lng: -73.9304704,
    imageUrl: "images/high_bridge_at_night.jpg",
    details: "(c1915) by Ernest Lawson. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.206651.html'>National Gallery of Art</a>.",
  },
  {
    name: "Charing Cross Bridge, London",
    lat: 51.506298,
    lng: -0.120496,
    imageUrl: "images/charing_cross.jpg",
    details: "(1890) by Camille Pissarro. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.66430.html'>National Gallery of Art</a>.",
  },
  {
    name: "The Fortress of Königstein",
    lat: 50.9190331,
    lng: 14.0572688,
    imageUrl: "images/the_fortress_of_konigstein_1993.8.1.jpg",
    details: "(1756-1758) by Bernardo Bellotto. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.80924.html'>National Gallery of Art</a>.",
  },
  {
    name: "The Tiber River with the Ponte Molle at Sunset",
    lat: 41.935556,
    lng: 12.466944,
    imageUrl: "images/the_tiber_river_with_the_ponte_molle_at_sunset_2012.129.1.jpg",
    details: "(c1650) by Jan Asselijn. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.159836.html'>National Gallery of Art</a>.",
  },
  {
    name: "A Sunday on La Grande Jatte",
    lat: 48.8948193,
    lng: 2.2664345,
    imageUrl: "images/Jatte.jpg",
    details: "(1884) by Georges Seurat. <br><br> From the <a href='https://www.artic.edu/artworks/27992/a-sunday-on-la-grande-jatte-1884'>Art Institute of Chicago</a>.",
  },
  {
    name: "South Wind, Clear Sky",
    lat: 35.3628299,
    lng: 138.7307859,
    imageUrl: "images/Red_Fuji_southern_wind_clear_morning.jpg",
    details: "(c1830) by Katsushika Hokusai. <br><br> From the <a href='https://commons.wikimedia.org/wiki/File:Red_Fuji_southern_wind_clear_morning.jpg'>Wikimedia</a>.",
  },
  {
    name: "The Five Points",
    lat: 40.7143643,
    lng: -74.0005577,
    imageUrl: "images/DP265419.jpg",
    details: "(c1827) by Unknown. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/20891'>Met Museum</a>.",
  },
  {
    name: "The Hill of the Alhambra, Granada",
    lat: 37.1768988,
    lng: -3.5897378,
    imageUrl: "images/DP226882.jpg",
    details: "(1865) by Samuel Colman. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/10508'>Met Museum</a>.",
  },
  {
    name: "Old Bruton Church, Williamsburg, Virginia",
    lat: 37.2713798,
    lng: -76.7025813,
    imageUrl: "images/DT207462.jpg",
    details: "(1893) by Alfred Thompson. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/12796'>Met Museum</a>.",
  },
  {
    name: "Warwick Castle",
    lat: 52.2794138,
    lng: -1.5845975,
    imageUrl: "images/Wrightsman21.jpg",
    details: "(1748) by Canaletto. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/438106'>Met Museum</a>.",
  },
  {
    name: "The Huis ten Bosch at The Hague and Its Formal Garden",
    lat: 52.0930774,
    lng: 4.3438645,
    imageUrl: "images/DP145409.jpg",
    details: "(c1669) by Jan van der Heyden. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/436648'>Met Museum</a>.",
  },
  {
    name: "Seventh Regiment on Review, Washington Square, New York",
    lat: 40.7307828,
    lng: -73.9973284,
    imageUrl: "images/DT2023.jpg",
    details: "(c1851) by Otto Boetticher. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/10194'>Met Museum</a>.",
  },
  {
    name: "The Molo, Venice, Looking West",
    lat: 45.4334887,
    lng: 12.3405578,
    imageUrl: "images/DT3064.jpg",
    details: "(1709) by Luca Carlevaris. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/459032'>Met Museum</a>.",
  },
  {
    name: "Portejoie on the Seine",
    lat: 49.2439852,
    lng: 1.2544189,
    imageUrl: "images/DP-19017-001.jpg",
    details: "(1858-1868) by Charles-François Daubigny. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/436088'>Met Museum</a>.",
  },
  {
    name: "Sunrise on the Matterhorn",
    lat: 45.976576,
    lng: 7.6584719,
    imageUrl: "images/DT218107.jpg",
    details: "(1875) by Albert Bierstadt. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/10158'>Met Museum</a>.",
  },
  {
    name: "Fourth of July in Centre Square, Philadelphia",
    lat: 39.9524397,
    lng: -75.1637497,
    imageUrl: "images/1845_3_1_l.jpg",
    details: "(1812) by John L. Krimmel. <br><br> From the <a href='https://www.pafa.org/museum/collection/item/fourth-july-centre-square'>Pennsylvania Academy of the Fine Arts</a>.",
  },
  {
    name: "Porte de la Reine at Aigues-Mortes",
    lat: 43.5648263,
    lng: 4.1942591,
    imageUrl: "images/DP-17243-001.jpg",
    details: "(1867) by Jean-Frédéric Bazille. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/435626'>Met Museum</a>.",
  },
  {
    name: "Stage Fort across Gloucester Harbor",
    lat: 42.6052657,
    lng: -70.6781733,
    imageUrl: "images/DT5586.jpg",
    details: "(1862) by Fitz Henry Lane. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/11396'>Met Museum</a>.",
  },
  {
    name: "Parochialstrasse in Berlin",
    lat: 52.5170764,
    lng: 13.4115749,
    imageUrl: "images/DP157664.jpg",
    details: "(1831) by Eduard Gaertner. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/438848'>Met Museum</a>.",
  },
  {
    name: "The Grand Canal above the Rialto",
    lat: 45.4379897,
    lng: 12.3359142,
    imageUrl: "images/DP124053.jpg",
    details: "(1760-1770) by Francesco Guardi. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/436599'>Met Museum</a>.",
  },
  {
    name: "Church of Notre Dame, Bruges",
    lat: 51.2046739,
    lng: 3.2244486,
    imageUrl: "images/ycba_c51ed4fd-f6ab-41aa-9ce3-39354305c1fe.jpg",
    details: "(c1820) by Samuel Austin. <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:13052'>Yale Center for British Art</a>.",
  },
  {
    name: "View of Ely Cathedral",
    lat: 52.3986137,
    lng: 0.2638014,
    imageUrl: "images/ycba_f5771714-0f77-4200-b0e9-fee60ccdc763.jpg",
    details: "(c1796) by Joseph Mallord William Turner. <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:1880'>Yale Center for British Art</a>.",
  },
  {
    name: "Boulevard des Italiens, Morning, Sunlight",
    lat: 48.8713205,
    lng: 2.3364162,
    imageUrl: "images/sunlight.jpg",
    details: "(1897) by Camille Pissarro. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.46673.html'>National Gallery of Art</a>.",
  },
  {
    name: "Washerwomen on the Beach of Etretat",
    lat: 49.7073109,
    lng: 0.1935979,
    imageUrl: "images/washerwomen_on_the_beach_of_etretat_1970.17.17.jpg",
    details: "(1894) by Eugène Boudin. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.52161.html'>National Gallery of Art</a>.",
  },
  {
    name: "Ruins of the Parthenon",
    lat: 37.9715219,
    lng: 23.7266424,
    imageUrl: "images/ruins_of_the_parthenon_2014.79.20.jpg",
    details: "(1880) by Sanford Robinson Gifford. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.121547.html'>National Gallery of Art</a>.",
  },
  {
    name: "The Porta Portello, Padua",
    lat: 45.4098414,
    lng: 11.8927044,
    imageUrl: "images/portello.jpg",
    details: "(c1741) by Canaletto. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.46152.html'>National Gallery of Art</a>.",
  },
  {
    name: "Nymphenburg Palace, Munich",
    lat: 48.1582611,
    lng: 11.5033879,
    imageUrl: "images/nymphenburg.jpg",
    details: "(c1761) by Bernardo Bellotto and Workshop. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.46162.html'>National Gallery of Art</a>.",
  },
  {
    name: "The Forum at Pompeii",
    lat: 40.7492886,
    lng: 14.4847282,
    imageUrl: "images/forum.jpg",
    details: "(1819) by Achille-Etna Michallon. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.221599.html'>National Gallery of Art</a>.",
  },
  {
    name: "The Roman Theater at Taormina",
    lat: 37.8523123,
    lng: 15.292199,
    imageUrl: "images/the_roman_theater_at_taormina_2004.166.33.jpg",
    details: "(1828) by Louise-Joséphine Sarazin de Belmont. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.130896.html'>National Gallery of Art</a>.",
  },
  {
    name: "The Taj Mahal",
    lat: 27.1749757,
    lng: 78.0421602,
    imageUrl: "images/the_taj_mahal_1978.80.3.jpg",
    details: "(1860-80) by Erastus Salisbury Field. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.56730.html'>National Gallery of Art</a>.",
  },
  {
    name: "Emancipation Proclamation",
    lat: 38.8898012,
    lng: -77.0090292,
    imageUrl: "images/emancipation_proclamation_1955.11.10.jpg",
    details: "(1864) by A.A. Lamb. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.43441.html'>National Gallery of Art</a>.",
  },
  {
    name: "Flood at Port-Marly",
    lat: 48.8804217,
    lng: 2.1108704,
    imageUrl: "images/flood_at_port-marly_1985.64.38.jpg",
    details: "(1872) by Alfred Sisley. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.66436.html'>National Gallery of Art</a>.",
  },
  {
    name: "Landscape with the Ruins of the Castle of Egmond",
    lat: 52.6216328,
    lng: 4.6545006,
    imageUrl: "images/Egmond.jpg",
    details: "(1650-55) by Jacob van Ruisdael. <br><br> From the <a href='https://www.artic.edu/artworks/60755/landscape-with-the-ruins-of-the-castle-of-egmond'>Art Institute Chicago</a>.",
  },
  {
    name: "The Eruption of Vesuvius",
    lat: 40.8213076,
    lng: 14.4263522,
    imageUrl: "images/Vesuvius.jpg",
    details: "(1771) by Pierre-Jacques Volaire. <br><br> From the <a href='https://www.artic.edu/artworks/57996/the-eruption-of-vesuvius'>Art Institute Chicago</a>.",
  },
  {
    name: "Hunting near Hartenfels Castle",
    lat: 51.5589021,
    lng: 13.0089165,
    imageUrl: "images/1958.425_web.jpg",
    details: "(1540) by Lucas Cranach. <br><br> From the <a href='https://www.clevelandart.org/art/1958.425'>Cleveland Museum of Art</a>.",
  },
  {
    name: "Tour de Montelban, Amsterdam",
    lat: 52.3720105,
    lng: 4.905642,
    imageUrl: "images/download.png",
    details: "(1884) by Maxime Lalanne. <br><br> From the <a href='https://www.clevelandart.org/art/1998.365'>Cleveland Museum of Art</a>.",
  },
  {
    name: "Morning, An Overcast Day, Rouen",
    lat: 49.437191,
    lng: 1.0913427,
    imageUrl: "images/DT1863.jpg",
    details: "(1896) by Camille Pissarro. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/437308'>Met Museum</a>.",
  },
  {
    name: "Pirna: The Obertor from the South",
    lat: 50.9615451,
    lng: 13.9440107,
    imageUrl: "images/DT4602.jpg",
    details: "(c1750) by Bernardo Bellotto. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/435646'>Met Museum</a>.",
  },
  {
    name: "Rear View of Greek Church, Sitka",
    lat: 57.0500595,
    lng: -135.3350632,
    imageUrl: "images/SAAM-1985.66.326798_1_screen.jpg",
    details: "(1888) by Theodore J. Richardson. <br><br> From the <a href='https://americanart.si.edu/artwork/rear-view-greek-church-sitka-1888-20899'>Smithsonian</a>.",
  },
  {
    name: "Cotopaxi",
    lat: -0.684064,
    lng: -78.4367661,
    imageUrl: "images/SAAM-1965.12_2-000001_screen.jpg",
    details: "(1855) by Frederic Edwin Church. <br><br> From the <a href='https://americanart.si.edu/artwork/cotopaxi-4807'>Smithsonian</a>.",
  },
  {
    name: "Antwerp Cathedral",
    lat: 51.2203574,
    lng: 4.4015973,
    imageUrl: "images/SAAM-1962.13.8_1_screen.jpg",
    details: "(1899) by Cass Gilbert. <br><br> From the <a href='https://americanart.si.edu/artwork/antwerp-cathedral-9010'>Smithsonian</a>.",
  },
  {
    name: "View of Windsor Castle",
    lat: 51.483987,
    lng: -0.60431,
    imageUrl: "images/ma-312377.jpg",
    details: "(1863) by Edward Moran. <br><br> From the <a href='https://collections.lacma.org/node/2157735'>Los Angeles County Museum of Art</a>.",
  },
  {
    name: "Clearing Storm at Gibraltar",
    lat: 36.1441334,
    lng: -5.3421144,
    imageUrl: "images/SAAM-2011.43_1.jpg",
    details: "(1860) by Samuel Colman. <br><br> From the <a href='https://americanart.si.edu/artwork/clearing-storm-gibraltar-81938'>Smithsonian</a>.",
  },
  {
    name: "Ponte Vecchio, Florence",
    lat: 43.767922,
    lng: 11.2531284,
    imageUrl: "images/SAAM-1983.83.154_1_screen.jpg",
    details: "(1900) by George Elbert Burr. <br><br> From the <a href='https://americanart.si.edu/artwork/ponte-vecchio-florence-3276'>Smithsonian</a>.",
  },
  {
    name: "The Custom House at Greenock, Scotland",
    lat: 55.9480583,
    lng: -4.7509405,
    imageUrl: "images/DP115732.jpg",
    details: "(1828) by Robert Salmon. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/12024'>Met Museum</a>.",
  },
  {
    name: "Vechte House at Gowannus, Brooklyn, New York",
    lat: 40.6730128,
    lng: -73.9845876,
    imageUrl: "images/ap36.123.1.jpg",
    details: "(1865) by Unknown. <br><br> From the <a href='https://w",
  },
  
  {
    name: "View of the Town of Alkmaar",
    lat: 52.632614,
    lng: 4.743932,
    imageUrl: "images/DP145944.jpg",
    details: "(1620-70) by Salomon van Ruysdael. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/437590'>Met Museum</a>.",
  },
  {
    name: "Ghent Gate, Bruges",
    lat: 51.21264302630933,
    lng: 3.2404485616302026,
    imageUrl: "images/DAC_1984-29-113_001_OA.jpg",
    details: "(1898) by William Strang. <br><br> From the <a href='https://dac-collection.wesleyan.edu/objects-1/info/13179'>Davison Art Center</a>.",
  },
  {
    name: "High Street, Edinburgh",
    lat: 55.94950293449235,
    lng: -3.190887963219886,
    imageUrl: "images/ycba_a56bcc91-8fed-4764-a6b0-8b50b24c017d.jpg",
    details: "(1818) by Joseph Mallord William Turner. <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:5501'>Yale Center for British Art</a>.",
  },
  {
    name: "Ruins of the Château de Pierrefonds",
    lat: 49.3469489361878,
    lng: 2.9801644318251,
    imageUrl: "images/1940.965_v01_o4.jpg",
    details: "(c1832) by Jean-Baptiste-Camille Corot. <br><br> From the <a href='https://www.cincinnatiartmuseum.org/art/explore-the-collection?id=11296492'>Cincinnati Art Museum</a>.",
  },
  {
    name: "Brooklyn Bridge",
    lat: 40.70613429891641,
    lng: -73.99669263862219,
    imageUrl: "images/BrooklynBridge.jpg",
    details: "(1899) by Henry Ward Ranger. <br><br> From the <a href='https://www.artic.edu/artworks/16545/brooklyn-bridge'>Art Institute Chicago</a>.",
  },
 
  
  {
    name: "Ponte Santa Trinità, Florence",
    lat: 43.76901934731335,
    lng: 11.250309358895594,
    imageUrl: "images/DP837464.jpg",
    details: "(pre 1832) by James Duffield Harding. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/406118'>Met Museum</a>."
  },
  {
    name: "Old Annapolis, Francis Street",
    lat: 38.97806598531773,
    lng: -76.48972283733242,
    imageUrl: "images/DT218025.jpg",
    details: "(1876) by Francis Blackwell Mayer. <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/11524'>Met Museum</a>."
  },
  {
    name: "Founding of Australia, Sydney Cove",
    lat: -33.859206443817655,
    lng: 151.2115517335217,
    imageUrl: "images/a128112h.jpg",
    details: "(1937) by Algernon Talmage. <br><br> From the <a href='https://www.sl.nsw.gov.au/collection-items/founding-australia-capt-arthur-phillip-rn-sydney-cove-jan-26th-1788'>State Library NSW</a>."
  },
  {
    name: "Compton Castle, Devonshire, England",
    lat: 50.472513544702124,
    lng: -3.6002784478031242,
    imageUrl: "images/SAAM-1962.13.62_1.jpg",
    details: "(1928) by Cass Gilbert. <br><br> From the <a href='https://americanart.si.edu/artwork/compton-castle-devonshire-england-9031'>Smithsonian</a>."
  },
  {
    name: "Eichhorn Castle at Evening",
    lat: 49.25689,
    lng: 16.462614,
    imageUrl: "images/eichhorn_castle_at_evening_2000.73.1.jpg",
    details: "(c1838) by Josef Höger. <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.111633.html'>National Gallery of Art</a>."
  },
  {
    name: "Saint Salvi Church, Albi",
    lat: 43.92801546810641,
    lng: 2.1447380095308684,
    imageUrl: "images/Salvi.jpg",
    details: "(1830-40) by Pierre Achille Poirot. <br><br> From the <a href='https://www.artic.edu/artworks/110752/saint-salvi-church-albi'>Art Institute Chicago</a>."
  },
  {
    name: "Notre Dame de Paris",
    lat: 48.85302281283721,
    lng: 2.349916971036055,
    imageUrl: "images/Notre.jpg",
    details: "(1890-95) by Jean François Raffaëlli. <br><br> From the <a href='https://www.artic.edu/artworks/81568/notre-dame-de-paris'>Art Institute Chicago</a>."
  },
  {
    name: "Manhattan Bridge Loop",
    lat: 40.70717484316477,
    lng: -73.99054307782178,
    imageUrl: "images/Manhattan-bridge-loop-edward-hopper-1928.jpg",
    details: "(1928) by Edward Hopper. <br><br> From the <a href='https://addison.andover.edu/search-the-collection/?embark_query=/objects-1/info/1594?sort=0&objectName=Manhattan%20Bridge%20Loop'>Addison Gallery of American Art</a>."
  },
  {
    name: "Karlskirche, Wien",
    lat: 48.198283497151444,
    lng: 16.37189996806785,
    imageUrl: "images/Johann_Friedrich_Wizani_001.jpg",
    details: "(1895) by Johann Friedrich Wizani. <br><br> From the <a href='https://sammlung.wienmuseum.at/objekt/82848-blick-vom-wienfluss-gegen-elisabethbruecke-und-karlskirche/'>Wien Museum</a>."
  },
  {
    name: "Schloss Persenbeug an der Donau",
    lat: 48.19003718618461,
    lng: 15.075604058841773,
    imageUrl: "images/Ferdinand.jpg",
    details: "(1833) by Ferdinand Georg Waldmüller. <br><br> From the <a href='https://www.kunsthalle-karlsruhe.de/'>Staatliche Kunsthalle Karlsruhe</a>."
  },
  {
    name: "Wells Cathedral, England",
    lat: 51.21035620175577,
    lng: -2.64347990529991,
    imageUrl: "images/SAAM-1962.13.42_1.jpg",
    details: "(1905) by Cass Gilbert. <br><br> From the <a href='https://www.si.edu/object/wells-cathedral-england:saam_1962.13.42'>Smithsonian</a>."
  },
  {
    name: "Bright Light at Russells Corners",
    lat: 42.04637925090316,
    lng: -74.11910363873254,
    imageUrl: "images/Bright_Light_at_Russell's_Corners_by_George_Ault_(1946).jpg",
    details: "(1958) by George Ault. <br><br> From the <a href='https://www.si.edu/object/bright-light-russells-corners:saam_1976.121'>Smithsonian</a>."
  },
  {
    name: "A View of St. Mary's Church, Oxford",
    lat: 51.75279324881308,
    lng: -1.2536998938233277,
    imageUrl: "images/ycba_bc3c66ce-4a77-40c2-b77f-85870cf8272b.jpg",
    details: "(c1760) by John Donowell. <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:4554'>Yale Center for British Art</a>."
  },
  {
    name: "Charles Bridge in Prague",
    lat: 50.08653902704181,
    lng: 14.411286392729664,
    imageUrl: "images/533089ldsdl.jpg",
    details: "(20th Century) by René Leclercq. <br><br> From the <a href='https://vlaamsekunstcollectie.be/en/collection/2595'>Flemish Art Collection</a>."
  },
  {
    name: "Kororareka Beach, Bay of Islands, New Zealand",
    lat: -35.26174362306738,
    lng: 174.12125725381634,
    imageUrl: "images/536736ldsdl.jpg",
    details: "(c1856) by Thomas Gardiner. <br><br> From the <a href='https://collections.tepapa.govt.nz/object/41571'>Museum of New Zealand</a>."
  },
  {
    name: "Das Rathaus in Gmunden",
    lat: 47.918124059145576,
    lng: 13.799400670121077,
    imageUrl: "images/Belvedere.jpg",
    details: "(1860) by Rudolf von Alt. <br><br> From the <a href='https://sammlung.belvedere.at/objects/6770/das-rathaus-in-gmunden?'>Belvedere Gallery, Austria</a>."
  },
  {
    name: "Der Damplatz zu Amsterdam mit dem Rathaus und der Waage",
    lat: 52.373127508047965,
    lng: 4.892463792419649,
    imageUrl: "images/kunsthallekarlsruhe-gerrit-adriansz.-berckheyde-der-damplatz-zu-amsterdam-mit-dem-rathau-341.small_.jpg",
    details: "(1689) by Gerrit Adriansz. Berckheyde. <br><br> From the <a href='https://www.kunsthalle-karlsruhe.de/kunstwerke/Gerrit-Adriansz--Berckheyde/Der-Damplatz-zu-Amsterdam-mit-dem-Rathaus-und-der-Waage/0AAD71E7451E6E3EAC97F5B1C9CD326F/'>Staatliche Kunsthalle Karlsruhe</a>."
  },
  {
    name: "Aquaduct at Segovia, Spain",
    lat: 40.948025956381244,
    lng: -4.117859686583211,
    imageUrl: "images/Edward.jpg",
    details: "(19th Century) by Edward Alfred Goodall <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:10256'>Yale Center for British Art</a>."
  },
  {
    name: "Karl Knutson Bonde Leaving Vyborg Castle For The Royal Election In Stockholm",
    lat: 60.71570989449037,
    lng: 28.72858365963885,
    imageUrl: "images/1024px-Severin_Falkman_-_Karl_Knutson_Bonde_Leaving_Vyborg_Castle_for_the_Royal_Election_in_Stockholm_1448.jpg",
    details: "(1886) by Severin Falkman <br><br> From the <a href='https://www.kansallisgalleria.fi/fi/object/625537'>Finnish National Gallery</a>."
  },
  {
    name: "City Hall, Cape Town",
    lat: -33.925436093239625,
    lng: 18.42390456546646,
    imageUrl: "images/Robert.jpg",
    details: "(1917) by Robert Gwelo Goodman <br><br> From the <a href='https://www.iziko.org.za/'>Iziko South African National Gallery</a>."
  },
  {
    name: "Town Hall in Vilnius",
    lat: 54.678154606053894,
    lng: 25.286912831678286,
    imageUrl: "images/530679ldsdl.jpg",
    details: "(1946) by Marcin Zaleski <br><br> From the <a href='https://www.mnw.art.pl/en/'>National Museum in Warsaw</a>."
  },
  {
    name: "Princes Street with the Commencement of the Building of the Royal Institution",
    lat: 55.95201455069297,
    lng: -3.1963202185542468,
    imageUrl: "images/503329ldsdl.jpg",
    details: "(1825) by Alexander Nasmyth <br><br> From the <a href='https://www.nationalgalleries.org/art-and-artists/17469'>National Galleries Scotland</a>."
  },
  {
    name: "Ruins of the Trakai Island Castle at sunset",
    lat: 54.652374680648784,
    lng: 24.933651103827362,
    imageUrl: "images/Jozef.jpg",
    details: "(1866) by Józef Marszewski <br><br> From the <a href='https://cyfrowe.mnw.art.pl/en/catalog/445643'>National Museum in Warsaw</a>."
  },
  {
    name: "View of the Łazienki Palace in summer",
    lat: 52.21505051523167,
    lng: 21.03580040216378,
    imageUrl: "images/azienki_Palace.jpg",
    details: "(1837) by Marcin Zaleski <br><br> From the <a href='https://cyfrowe.mnw.art.pl/en/home'>National Museum in Warsaw</a>."
  },
  {
    name: "Exposition de 1900, le pont de l'Alma",
    lat: 48.86350018067251,
    lng: 2.3017561919601035,
    imageUrl: "images/image_brouardel_laure_exposition_de_1_d.7633_407679.jpg",
    details: "(1900) by Laure Brouardel <br><br> From the <a href='https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/exposition-de-1900-le-pont-de-l-alma#infos-principales'>Paris Musees</a>."
  },
  {
    name: "The so-called Boerenverdriet on the Spui, Amsterdam",
    lat: 52.36827355674235,
    lng: 4.888875532887837,
    imageUrl: "images/522659ldsdl.jpg",
    details: "(1750-81) by Jan Ekels <br><br> From the <a href='https://www.rijksmuseum.nl/en/collection/SK-A-3475'>Rijksmuseum</a>."
  },
  {
    name: "Landscape with ships in front of Caernarvon Castle",
    lat: 53.13933477642847,
    lng: -4.276869915968849,
    imageUrl: "images/523825ldsdl.jpg",
    details: "(1883) by William Callow <br><br> From the <a href='https://www.rijksmuseum.nl/nl/collectie/RP-T-1978-4'>Rijksmuseum</a>."
  },
  {
    name: "Street Scene at Stratford by Bow",
    lat: 51.52878304978209,
    lng: -0.016678761487461734,
    imageUrl: "images/529900ldsdl.jpg",
    details: "(c1850) by Thomas Shotter Boys <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:12506'>Yale Center for British Art</a>."
  },
  {
    name: "Inside the Main Entrance of the Purana Qila, Delhi",
    lat: 28.608841973461026,
    lng: 77.2422407564747,
    imageUrl: "images/506362ldsdl.jpg",
    details: "(1823) by Robert Smith <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:306'>Yale Center for British Art</a>."
  },
  {
    name: "Concorde temple within walls of ancient Agrigentum",
    lat: 37.2896610051625,
    lng: 13.59205892142171,
    imageUrl: "images/Concorde.jpg",
    details: "(1778) by Louis Ducros <br><br> From the <a href='https://www.rijksmuseum.nl/nl/collectie/RP-T-00-494-39'>Rijksmuseum</a>."
  },
  {
    name: "A Landscape with Curragh Chase, County Limerick",
    lat: 52.58979668480128,
    lng: -8.870988391690116,
    imageUrl: "images/Limerick.jpg",
    details: "(1834) by Jeremiah Hodges Mulcahy <br><br> From the <a href='https://www.nationalgallery.ie/'>National Gallery of Ireland</a>."
  },
  {
    name: "Büresheim Castle on the Eifel River",
    lat: 50.352737788358674,
    lng: 7.1798328365536825,
    imageUrl: "images/Kunst.jpg",
    details: "(1838) by Frederik Sødring <br><br> From the <a href='https://open.smk.dk/artwork/image/KMS345'>Statens Museum for Kunst</a>."
  },
  {
    name: "View of Aschaffenburg",
    lat: 49.97604207718476,
    lng: 9.141663219805931,
    imageUrl: "images/1851-christian_georg_schutz_elder-view_aschaffenburg-1786.png",
    details: "(1786) by Christian Georg Schütz the elder <br><br> From the <a href='https://sammlung.staedelmuseum.de/en/work/view-of-aschaffenburg'>Städel Museum</a>."
  },
  {
    name: "Lilleshall, Shropshire: View of the North Entrance and of the West Front",
    lat: 52.72720592344428,
    lng: -2.3737330414142708,
    imageUrl: "images/ycba_2d1b6023-0768-4ce1-9a5b-4eb8b668036e.jpg",
    details: "(1826) by Sir Jeffry Wyatville <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:6270'>Yale Center for British Art</a>."
  },
  {
    name: "Burg Scharfenberg at Night",
    lat: 51.12521481341898,
    lng: 13.527553439015197,
    imageUrl: "images/528537.jpg",
    details: "(1827) by Ernst Ferdinand Oehme <br><br> From the <a href='https://recherche.smb.museum/detail/961104/burg-scharfenberg-bei-nacht?language=de&question=Burg+Scharfenberg+at+Night&limit=15&sort=relevance&controls=none&collectionKey=NG*&collectionKey=NGAlteNationalgalerie&objIdx=0'>State Museums in Berlin</a>."
  },
  {
    name: "St Mary's Church in Krakow",
    lat: 50.061604148424856,
    lng: 19.939603944429326,
    imageUrl: "images/Krakow.jpg",
    details: "(1900) by Wawrzeniecki, Marian <br><br> From the <a href='https://zbiory.mnk.pl/en/catalog/409216'>National Museum in Krakow</a>."
  },
  {
    name: "Die Spinnerin am Kreuz mit Aussicht gegen das Mödlinger Gebirge",
    lat: 48.17101144093542,
    lng: 16.350696456061456,
    imageUrl: "images/Spinnerin_am_Kreuz_1831.jpg",
    details: "(1831) by Franz Scheyerer <br><br> From the <a href='https://sammlung.wienmuseum.at/en/object/129254-die-spinnerin-am-kreuz-mit-aussicht-gegen-das-moedlinger-gebirge/'>Wein Museum</a>."
  },
  {
    name: "Street Scene in Beverwijk",
    lat: 52.48589679530798,
    lng: 4.658556305286563,
    imageUrl: "images/524647ldsdl.jpg",
    details: "(1793) by Jacob Cats <br><br> From the <a href='https://www.rijksmuseum.nl/nl/collectie/RP-T-1964-58'>Rijksmuseum</a>."
  },
  {
    name: "Harfleur near Le Havre (view of Saint Martin)",
    lat: 49.50711206547648,
    lng: 0.19991185150812835,
    imageUrl: "images/540933ldsdl.jpg",
    details: "(1836) by Johann Wilhelm Schirmer <br><br> From the <a href='https://www.kunsthalle-karlsruhe.de/kunstwerke/Johann-Wilhelm-Schirmer/Harfleur-bei-Le-Havre--Blick-auf-Saint-Martin/17CA36184EC0CEB5E0B20A8EB7AD7C9D/'>Staatliche Kunsthalle Karlsruhe</a>."
  },
  {
    name: "View of Oudezijds Voorburgwal with the Oude Kerk in Amsterdam",
    lat: 52.37438453232728,
    lng: 4.898123738466199,
    imageUrl: "images/0868_repro.jpg",
    details: "(1670) by Jan van der Heyden <br><br> From the <a href='https://www.mauritshuis.nl/en/our-collection/artworks/868-view-of-oudezijds-voorburgwal-with-the-oude-kerk-in-amsterdam/'>Mauritshuis</a>."
  },
  {
    name: "Christ Church Gate, Canterbury",
    lat: 51.279307787801635,
    lng: 1.0811634973173927,
    imageUrl: "images/canterbury.jpg",
    details: "(1793) by J. M. W. Turner <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:2135'>Yale Center for British Art</a>."
  },
  {
    name: "A View of Alexander Pope's Villa, Twickenham, on the Banks of the Thames",
    lat: 51.442106701050115,
    lng: -0.3313032507828993,
    imageUrl: "images/pope.jpg",
    details: "(1759) by Samuel Scott  <br><br> From the <a href='https://www.denverartmuseum.org/en'>Denver Art Museum</a>."
  },
  {
    name: "St Bavo's Cathedral and the Reep in Ghent",
    lat: 51.05298992949669,
    lng: 3.727187284689531,
    imageUrl: "images/535937ldsdl.jpg",
    details: "(1831) by Pieter-Frans De Noter  <br><br> From the <a href='https://www.mskgent.be/en/collection/1975-U'>Museum of Fine Arts Ghent</a>."
  },
  {
    name: "Rear View of Buitenzorg Palace before the Earthquake of 10 October 1834",
    lat: -6.598023458543918,
    lng: 106.79732164413238,
    imageUrl: "images/523056ldsdl.jpg",
    details: "(1834) by Willem Troost the younger <br><br> From the <a href='https://www.rijksmuseum.nl/en/collection/SK-A-4024'>Rijksmusuem</a>."
  },
  {
    name: "View in the village of Harmelen",
    lat: 52.0912830939025,
    lng: 4.96456573829366,
    imageUrl: "images/524700ldsdl.jpg",
    details: "(1749) by Jan de Beijer <br><br> From the <a href='https://www.rijksmuseum.nl/nl/collectie/RP-T-1890-A-2264'>Rijksmusuem</a>."
  },
  {
    name: "Courtyard of the Doge's Palace",
    lat: 45.434024629263035,
    lng: 12.340314304893045,
    imageUrl: "images/515581ldsdl.jpg",
    details: "(1810) by Tranquillo Orsi <br><br> From the <a href='https://www.khm.at/'>Kunsthistorisches Museum</a>."
  },
  {
    name: "Durham Cathedral",
    lat: 54.773398131519045,
    lng: -1.5762442807490802,
    imageUrl: "images/539216ldsdl.jpg",
    details: "(1846) by George Arthur Fripp <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:9261'>Yale Center for British Art</a>."
  },
  {
    name: "The Augustusbrücke in Dresden",
    lat: 51.055302583979135,
    lng: 13.73955816351706,
    imageUrl: "images/Thomas.jpg",
    details: "(1829) by Thomas Fearnley <br><br> From the <a href='https://www.nasjonalmuseet.no/en/collection/object/NG.M.02218'>National Museum Norway</a>."
  },
  {
    name: "Tombs of the Memlooks, Cairo",
    lat: 30.023514425961885,
    lng: 31.25934967133141,
    imageUrl: "images/Memlooks.jpg",
    details: "(1838) by David Roberts <br><br> From the <a href='https://loc.gov/pictures/resource/cph.3g04057/'>Library of Congress</a>."
  },
  {
    name: "High Street, Oxford (Queen's College)",
    lat: 51.75280785454802,
    lng: -1.2510336604787498,
    imageUrl: "images/oxford.jpg",
    details: "(1798) by Thomas Malton the Younger <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:1535'>Yale Center for British Art</a>."
  },
  {
    name: "A View of the Cathedral and City of Lincoln from the River",
    lat: 53.23428392889462,
    lng: -0.5361550782144268,
    imageUrl: "images/lincoln.jpg",
    details: "(1760) by Joseph Baker of Lincoln <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:364'>Yale Center for British Art</a>."
  },
  {
    name: "The Pantheon",
    lat: 41.89858514019062,
    lng: 12.476838604931554,
    imageUrl: "images/508157ldsdl.jpg",
    details: "(c1800) by Victor Jean Nicolle  <br><br> From the <a href='https://www.nga.gov/collection/art-object-page.143894.html'>National Gallery of Art</a>."
  },
  {
    name: "The Singel Bridge at the Paleisstraat in Amsterdam",
    lat: 52.37220071425841,
    lng: 4.88848065222617,
    imageUrl: "images/522462ldsdl.jpg",
    details: "(1898) by George Hendrik Breitner  <br><br> From the <a href='https://www.rijksmuseum.nl/en/collection/SK-A-3580'>Rijksmuseum</a>."
  },
  {
    name: "Le Pont de Moret",
    lat: 48.372607507427574,
    lng: 2.8190656931110123,
    imageUrl: "images/508369ldsdl.jpg",
    details: "(1888) by Alfred Sisley <br><br> From the <a href='https://collections.artsmia.org/art/61319/le-pont-de-moret-alfred-sisley'>Minneapolis Institute of Art</a>."
  },
  {
    name: "The Railroad Bridge at Briare",
    lat: 47.6405648765318,
    lng: 2.7408497437601294,
    imageUrl: "images/Henri-Joseph_Harpignies_-_The_Railroad_Bridge_at_Briare_-_Google_Art_Project.jpg",
    details: "(c1900) by Joseph Harpignies <br><br> From the <a href='https://philbrook.org/'>Philbrook Museum of Art</a>."
  },
  {
    name: "At Barrière de la Villette, Paris",
    lat: 48.88346086629913,
    lng: 2.3695714251083335,
    imageUrl: "images/542009ldsdl.jpg",
    details: "(1823) by Auguste Xavier Leprince <br><br> From the <a href='https://collection.nationalmuseum.se/eMP/eMuseumPlus?service=ExternalInterface&module=collection&objectId=181922&viewType=detailView'>Nationalmuseum</a>."
  },
  {
    name: "Piazza della Bocca della Verità with the so-called Vesta Temple in Rome",
    lat: 41.88873461210782,
    lng: 12.480747969615766,
    imageUrl: "images/503938ldsdl.jpg",
    details: "(1837) by Constantin Hansen <br><br> From the <a href='https://open.smk.dk/artwork/image/kms1072'>Statens Museum for Kunst</a>."
  },
  {
    name: "The Harbor of Granatello near Portici with Vesuvius in the background",
    lat: 40.8097656213272,
    lng: 14.33455477753072,
    imageUrl: "images/port.jpeg",
    details: "(1819) by Joseph Rebell <br><br> From the <a href='https://sammlung.belvedere.at/objects/7948/der-hafen-granatello-bei-portici-mit-dem-vesuv-im-hintergrun'>Belvedere</a>."
  },
  {
    name: "Das Rathaus in Gmunden",
    lat: 47.918123436054714,
    lng: 13.79941299512479,
    imageUrl: "images/514641ldsdl.jpg",
    details: "(1860) by Rudolf von Alt <br><br> From the <a href='https://sammlung.belvedere.at/objects/6770/das-rathaus-in-gmunden'>Belvedere</a>."
  },
  {
    name: "La rue de Castiglione",
    lat: 48.86593251830277,
    lng: 2.3278987624296614,
    imageUrl: "images/rue.jpg",
    details: "(1829) by Canella, Giuseppe  <br><br> From the <a href='https://www.parismuseescollections.paris.fr/en/node/151547#infos-principales'>Paris Musées</a>."
  },
  {
    name: "King's Parade, Cambridge",
    lat: 52.20514181176664,
    lng: 0.11736769816618857,
    imageUrl: "images/cambridge.jpg",
    details: "(1798) by Thomas Malton the Younger  <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:1534'>Yale Center for British Art</a>."
  },
  {
    name: "Rainy Evening on Hennepin Avenue",
    lat: 44.974793223471416,
    lng: -93.2803792073738,
    imageUrl: "images/509407ldsdl.jpg",
    details: "(1902) by Robert Koehler  <br><br> From the <a href='https://collections.artsmia.org/art/303/rainy-evening-on-hennepin-avenue-robert-koehler'>Minneapolis Institute of Art</a>."
  },
  {
    name: "Haarlem City hall with figures on the Grote markt",
    lat: 52.38143591618554,
    lng: 4.635011559887189,
    imageUrl: "images/haarlem.jpeg",
    details: "(1671) by Gerrit Adriaensz Berckheyde  <br><br> From the <a href='https://www.franshalsmuseum.nl/nl/verdiep/collectie/'>Frans Hals Museum</a>."
  },
  {
    name: "View of the Bakenessergracht with the Passer-en-Valk Brewery",
    lat: 52.382282448242506,
    lng: 4.6403116918953184,
    imageUrl: "images/brew.jpg",
    details: "(1662) by Gerrit Berckheyde  <br><br> From the <a href='https://www.franshalsmuseum.nl/nl/art/gezicht-op-de-bakenessergracht-met-de-brouwerij-de-passer-en-de-valk/'>Frans Hals Museum</a>."
  },
  {
    name: "A Game of Bowls on the Bowling Green Outside the Bunch of Grapes Inn, Hurst, Berkshire",
    lat: 51.45021853757792,
    lng: -0.8565816764646562,
    imageUrl: "images/530688ldsdl.jpg",
    details: "(undated 1746-1801) by Michael Angelo Rooker  <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:47374'>Yale Center for British Art</a>."
  },
  {
    name: "Fair before Easter at the Bernardine square in Lviv in 1895",
    lat: 49.839268362799345,
    lng: 24.034193266624985,
    imageUrl: "images/lviv.jpg",
    details: "(1895) by Tadeusz Rybkowski  <br><br> From the <a href='https://cyfrowe.mnw.art.pl/en/catalog/444862'>National Museum in Warsaw</a>."
  },
  {
    name: "Krasiński Square and the Piarist church",
    lat: 52.24889324994805,
    lng: 21.007019103549943,
    imageUrl: "images/530671ldsdl.jpg",
    details: "(1830) by Marcin Zaleski  <br><br> From the <a href='https://cyfrowe.mnw.art.pl/en/catalog/445903'>National Museum in Warsaw</a>."
  },
  {
    name: "Myślewicki Palace in Warsaw",
    lat: 52.215511753494795,
    lng: 21.03829430859862,
    imageUrl: "images/Warsaw.jpg",
    details: "(c1870) by Marcin Zaleski  <br><br> From the <a href='https://cyfrowe.mnw.art.pl/en/catalog/447881'>National Museum in Warsaw</a>."
  },
  {
    name: "View of the Square in Amalfi",
    lat: 40.634329093808205,
    lng: 14.602595196584474,
    imageUrl: "images/KMS8884.jpg",
    details: "(1835) by Martinus Rørbye  <br><br> From the <a href='https://open.smk.dk/en/artwork/image/KMS8884'>Statens Museum for Kunst</a>."
  },
  {
    name: "Vue du pont de la Guillotière à Lyon",
    lat: 45.75685716685581,
    lng: 4.838035099192827,
    imageUrl: "images/505137ldsdl.jpg",
    details: "(1760) by Jean-Jacques de Boissieu  <br><br> From the <a href='https://sammlung.staedelmuseum.de/en/work/vue-du-pont-de-la-guillotiere-a-lyon'>Städel Museum</a>."
  },
  {
    name: "Roman Market Scene in the Piazza Navona",
    lat: 41.89893660267209,
    lng: 12.473066386221028,
    imageUrl: "images/navona.png",
    details: "(1657) by Johannes Lingelbach <br><br> From the <a href='https://sammlung.staedelmuseum.de/en/work/roman-market-scene-in-the-piazza-navona'>Städel Museum</a>."
  },
  {
    name: "View of Aschaffenburg",
    lat: 49.97605645207857,
    lng: 9.141627661863916,
    imageUrl: "images/asch.png",
    details: "(1786) by Christian Georg Schütz the Elder <br><br> From the <a href='https://sammlung.staedelmuseum.de/en/work/view-of-aschaffenburg'>Städel Museum</a>."
  },
  {
    name: "View of the Binnenhof, The Hague",
    lat: 52.07960016844697,
    lng: 4.313337430369342,
    imageUrl: "images/binn.jpg",
    details: "(1690) by Gerrit Berckheyde <br><br> From the <a href='https://www.museothyssen.org/en/collection/artists/berckheyde-gerrit-adriaensz/view-binnenhof-hague'>Museo Nacional Thyssen-Bornemisza</a>."
  },
  {
    name: "Church of the Holy Cross in Warsaw",
    lat: 52.23870761431316,
    lng: 21.016797327746676,
    imageUrl: "images/bellotto.jpg",
    details: "(1778) by Bernardo Bellotto <br><br> From the <a href='https://kolekcja.zamek-krolewski.pl/en/obiekt-346-church-holy-cross'>National Museum in Warsaw</a>."
  },
  {
    name: "View from the Castle Square towards Krakowskie Przedmieście",
    lat: 52.247247395461706,
    lng: 21.01340040663948,
    imageUrl: "images/CastleSquare.jpg",
    details: "(C19th) by Filip Romanowski <br><br> From the <a href='https://cyfrowe.mnw.art.pl/en/catalog/440455'>National Museum in Warsaw</a>."
  },
  {
    name: "La rue des Prouvaires et l'église Saint-Eustache",
    lat: 48.86243121097536,
    lng: 2.344599039832925,
    imageUrl: "images/513102ldsdl.jpg",
    details: "(1828) by Giuseppe Canella <br><br> From the <a href='https://parismuseescollections.paris.fr/en/node/151535#infos-principales'>Paris Musées</a>."
  },
  {
    name: "The Admiral House, Simon's Town, Cape of Good Hope",
    lat: -34.1898457213882,
    lng: 18.426505741689887,
    imageUrl: "images/539561ldsdl.jpg",
    details: "(1844) by Lt. Humphrey John Julian <br><br> From the <a href='https://collections.britishart.yale.edu/catalog/tms:10760'>Yale Center for British Art</a>."
  },
  {
    name: "The Castle Geyser, Upper Geyser Basin, Yellowstone National Park",
    lat: 44.463674562161295,
    lng: -110.8364805492947,
    imageUrl: "images/531291ldsdl.jpg",
    details: "(1874) by Thomas Moran <br><br> From the <a href='https://www.cartermuseum.org/collection/castle-geyser-upper-geyser-basin-yellowstone-national-park-1971592'>Amon Carter Museum of American Art</a>."
  },
  {
    name: "View of 'Kastellet', Copenhagen",
    lat: 55.691550370464846,
    lng: 12.594609947234545,
    imageUrl: "images/542167ldsdl.jpg",
    details: "(1890) by Johan Rohde <br><br> From the <a href='https://emp-web-84.zetcom.ch/eMP/eMuseumPlus?service=ExternalInterface&module=collection&objectId=19757&viewType=detailView'>National Museum</a>."
  },
  {
    name: "South Akard Street",
    lat: 32.77909835936005,
    lng: -96.79927957199654,
    imageUrl: "images/911464absdl.jpg",
    details: "(1932) by Lloyd Sargent <br><br> From the <a href='https://www.dma.org/art/collection/object/3149188'>Dallas Museum of Art</a>."
  },
  {
    name: "Street in Røros in Winter",
    lat: 62.57729544765129,
    lng: 11.387894825786224,
    imageUrl: "images/513156ldsdl.jpg",
    details: "(1903) by Harald Sohlberg <br><br> From the <a href='https://www.nasjonalmuseet.no/en/collection/object/NG.M.00882'>Nasjonalmuseet Norway</a>."
  },
  {
    name: "St. Germain l'Auxerrois",
    lat: 48.85952977780359,
    lng: 2.341199888871341,
    imageUrl: "images/528472ldsdl.jpg",
    details: "(1867) by Claude Monet <br><br> From the <a href='https://www.smb.museum/en/home/'>Staatliche Museen zu Berlin</a>."
  },
  {
    name: "View of the Oude Delft Canal, Delft",
    lat: 52.012606093238105,
    lng: 4.35586516407528,
    imageUrl: "images/Heyden.jpg",
    details: "(1660) by Jan van der Heyden <br><br> From the <a href='https://dia.org/'>Detroit Institute of Art</a>."
  },
  {
    name: "Le pont de Narni",
    lat: 42.52505305754527,
    lng: 12.514646338824486,
    imageUrl: "images/Narnie.jpg",
    details: "(1826) by Jean-Baptiste Camille Corot <br><br> From the <a href='https://collections.louvre.fr/en/ark:/53355/cl010064102'>The Louvre</a>."
  },
  {
    name: "The Hay Wain",
    lat: 51.95836917163822,
    lng: 1.0219988009320369,
    imageUrl: "images/haywain.jpg",
    details: "(1821) by John Constable <br><br> From the <a href='https://www.nationalgallery.org.uk/paintings/john-constable-the-hay-wain'>The National Gallery</a>."
  },
  {
    name: "Winter Landscape With Figures On Ice",
    lat: 51.814167167293284,
    lng: 4.660531425624543,
    imageUrl: "images/Goyen_1643_Paisaje_invernal_con_figuras_en_el_hielo.jpg",
    details: "(1643) by Jan van Goyen <br><br> From the <a href='https://www.museothyssen.org/en/collection/artists/goyen-jan-josephsz-van/winter-landscape-figures-ice'>Thyssen-Bornemisza National Museum</a>."
  },
  {
    name: "Landscape, The Parc Monceau",
    lat: 48.87948591029008,
    lng: 2.3092446750616213,
    imageUrl: "images/Monceau.jpg",
    details: "(1876) by Claude Monet <br><br> From the <a href='https://www.metmuseum.org/art/collection/search/110001554'>The Met</a>."
  },
  {
    name: "The Granite Dish in the Berlin Lustgarten",
    lat: 52.5190992129009,
    lng: 13.399153895517056,
    imageUrl: "images/1024px-1831Hummel_Granitschale_im_Lustgarten_anagoria.jpeg",
    details: "(1831) by Johann Erdmann Hummel <br><br> From the <a href='https://www.smb.museum/home/'>Old National Gallery, Berlin</a>."
  },
  {
    name: "Entry of Napoleon I into Berlin",
    lat: 52.51626143862675,
    lng: 13.377700054154507,
    imageUrl: "images/Charles_Meynier_-_Napoleon_in_Berlin.png",
    details: "(1810) by Charles Meynier <br><br> From the <a href='https://en.chateauversailles.fr/'>Palace of Versailles</a>."
  },
  {
    name: "Parade Before the Crown Prince's Palace",
    lat: 52.51717350543938,
    lng: 13.396767840929257,
    imageUrl: "images/1839_Bruecke_Parade_vor_dem_Koeniglichen_Palais_anagoria.JPG",
    details: "(1839) by Wilhelm Brücke  <br><br> From the <a href='https://www.stadtmuseum.de/museum/maerkisches-museum'>Märkisches Museum</a>."
  },
  {
    name: "The flower market, the Clock Tower, the Pont au Change and the Pont-Neuf",
    lat: 48.85659664423805,
    lng: 2.3467693817282593,
    imageUrl: "images/Carnavalet.jpg",
    details: "(1832) by Giuseppe Canella  <br><br> From the <a href='https://www.parismuseescollections.paris.fr/en/musee-carnavalet/oeuvres/le-marche-aux-fleurs-la-tour-de-l-horloge-le-pont-au-change-et-le-pont-neuf'>Carnival Museum</a>."
  },
  {
    name: "Starry Night",
    lat: 43.680177889477044,
    lng: 4.629238050805474,
    imageUrl: "images/Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    details: "(1888) by Vincent van Gogh <br><br> From the <a href='https://www.musee-orsay.fr/en'>Musée d'Orsay</a>."
  }

 

];
