/* ================= Worlds and topics (CCEA AS spec numbering) ================= */
const WORLDS=[
 {id:"w1",hash:"cellular-frontier",num:"World 1",name:"The Cellular Frontier",unit:"AS1",full:"Molecules and Cells"},
 {id:"w2",hash:"living-frontier",num:"World 2",name:"The Living Frontier",unit:"AS2",full:"Organisms and Biodiversity"}];
const TOPICS=[
 {id:"m",w:"w1",code:"1.1",name:"Molecules",sum:"Water and inorganic ions, carbohydrates, lipids, proteins, nucleic acids, DNA replication, food tests and chromatography.",lab:[]},
 {id:"e",w:"w1",code:"1.2",name:"Enzymes",sum:"Active sites, activation energy, inhibitors, biomarkers and immobilised enzymes.",lab:["enzyme"]},
 {id:"v",w:"w1",code:"1.3",name:"Viruses",sum:"Bacteriophages, HIV and reverse transcriptase.",lab:[]},
 {id:"c",w:"w1",code:"1.4",name:"Cells",sum:"Prokaryotic and eukaryotic ultrastructure, the fluid mosaic model and microscopy.",lab:["cell-label","measure"]},
 {id:"p",w:"w1",code:"1.5",name:"Cell physiology",sum:"Diffusion, osmosis and water potential, active transport, endocytosis and exocytosis.",lab:[]},
 {id:"d",w:"w1",code:"1.6",name:"Continuity of cells",sum:"The cell cycle, mitosis, meiosis and anticancer drugs.",lab:["mitosis"]},
 {id:"t",w:"w1",code:"1.7",name:"Tissues and organs",sum:"The ileum and the mesophytic leaf.",lab:["leaf-label"]},
 {id:"x",w:"w2",code:"2.1",name:"Exchange and gas exchange",sum:"Surface area to volume ratio, Fick’s law, gas exchange in leaves and lungs, respirometers.",lab:["leaf-label"]},
 {id:"tp",w:"w2",code:"2.1",name:"Transport in plants",sum:"Root uptake, apoplast and symplast, transpiration, cohesion-tension, translocation, xerophytes and hydrophytes.",lab:[]},
 {id:"h",w:"w2",code:"2.1",name:"Circulatory system",sum:"The heart and cardiac cycle, blood vessels, blood, clotting, haemoglobin and myoglobin.",lab:["heart-label","heart-trace","oxygen"]},
 {id:"a",w:"w2",code:"2.2",name:"Adaptation of organisms",sum:"Climatic, edaphic and biotic factors, niches and sampling techniques.",lab:[]},
 {id:"b",w:"w2",code:"2.3",name:"Biodiversity",sum:"Simpson’s index, taxonomy and the five kingdom system.",lab:[]},
 {id:"hi",w:"w2",code:"2.4",name:"Human impact on biodiversity",sum:"Agricultural practices, eutrophication and BOD, conservation and climate change.",lab:[]}];
const topicById=Object.fromEntries(TOPICS.map(t=>[t.id,t]));

/* ================= Slide Run ================= */
const Run=(()=>{
// [topic, subtopic, question, options (correct first; shuffled when shown), explanation]
const Q=[
["m","Inorganic ions","Which inorganic ion is a component of chlorophyll?",["Magnesium","Iron","Calcium","Nitrate"],"Magnesium is part of chlorophyll. Iron is part of haemoglobin, calcium is in calcium pectate and phosphate is in ATP, nucleic acids and phospholipids."],
["m","Carbohydrates","Which bond joins two α-glucose molecules to form maltose?",["α-1,4 glycosidic bond","Peptide bond","Ester bond","Hydrogen bond"],"A condensation reaction forms a glycosidic bond and releases one molecule of water."],
["m","Carbohydrates","Cellulose is a structural polymer of…",["β-glucose","α-glucose","Fructose","Ribose"],"Every other β-glucose is inverted, giving straight chains. Hydrogen bonds between neighbouring chains make cellulose strong."],
["m","Carbohydrates","Which statement describes glycogen?",["A highly branched storage polymer of α-glucose found in animals","An unbranched structural polymer of β-glucose in plant cell walls","A disaccharide of glucose and fructose","A polymer of amino acids stored in the liver"],"Starch and glycogen are storage polymers of α-glucose. Glycogen’s many branches give many ends for enzymes to hydrolyse quickly."],
["m","Lipids","When a triglyceride forms from glycerol and three fatty acids, how many molecules of water are released?",["3","1","2","4"],"Each fatty acid joins glycerol by a condensation reaction, forming an ester bond and releasing one water molecule."],
["m","Lipids","What makes a fatty acid unsaturated?",["At least one C=C double bond in its hydrocarbon chain","It has no hydrocarbon chain","It contains a phosphate group","It is joined to glycerol by a glycosidic bond"],"Saturated fatty acids have only single C–C bonds. Double bonds put kinks in the chain."],
["m","Lipids","Why do phospholipids form a bilayer in water?",["They have a hydrophilic phosphate head and hydrophobic fatty acid tails","They have three hydrophobic tails","Their heads are joined by glycosidic bonds","Their tails are held by disulfide bonds"],"The heads face the water on each side and the tails face inwards, away from the water."],
["m","Proteins","Which level of protein structure is the α-helix and β-pleated sheet, held by hydrogen bonds?",["Secondary","Primary","Tertiary","Quaternary"],"Primary structure is the amino acid sequence, joined by peptide bonds."],
["m","Proteins","Which bonds and interactions hold the tertiary structure of a protein?",["Hydrogen, ionic and disulfide bonds and hydrophobic interactions","Peptide bonds only","Glycosidic bonds","Ester bonds"],"These bonds fold the polypeptide into a specific 3D shape, such as an enzyme’s active site."],
["m","Proteins","Which describes a prion?",["A protein with an altered secondary structure, rich in β-sheets, that causes neurodegenerative disease","A virus with an RNA genome","A lipid that blocks nerve impulses","A carbohydrate that causes BSE"],"Prion diseases include scrapie, BSE and CJD. Infection can occur by eating prion-rich food."],
["m","Food tests","A sample gives a negative Benedict’s test. After boiling with dilute acid and neutralising, the test is positive. The sample contains…",["A non-reducing sugar, such as sucrose","Starch only","Protein","A reducing sugar only"],"The acid hydrolyses the glycosidic bond, releasing reducing monosaccharides."],
["m","Food tests","Which reagent is used to test for protein?",["Biuret reagent","Iodine solution","Benedict’s reagent","Ethanol"],"A positive Biuret test turns from blue to purple (lilac)."],
["m","Chromatography","How is an Rf value calculated in paper chromatography?",["Distance moved by the amino acid ÷ distance moved by the solvent front","Distance moved by the solvent front ÷ distance moved by the amino acid","Distance moved by the amino acid × time","Length of paper ÷ distance moved by the solvent"],"Rf values are always less than 1 and are compared with known values to identify amino acids."],
["m","Nucleic acids","Which base is found in RNA but not in DNA?",["Uracil","Thymine","Cytosine","Adenine"],"RNA contains uracil instead of thymine and ribose instead of deoxyribose. RNA is usually single-stranded."],
["m","Nucleic acids","The two polynucleotide chains of DNA are described as antiparallel. This means…",["They run in opposite directions","They are not joined to each other","They contain different sugars","They have no base pairing"],"The two chains run in opposite directions and are held together by hydrogen bonds between specific base pairs."],
["m","DNA replication","Which enzyme opens the DNA helix by breaking the hydrogen bonds between bases?",["DNA helicase","DNA polymerase","Amylase","Reverse transcriptase"],"DNA polymerase then joins free nucleotides to form new complementary chains."],
["m","DNA replication","In the Meselson–Stahl experiment, bacteria grown in ¹⁵N were moved to ¹⁴N for one generation. Where did the DNA band appear?",["In an intermediate position","At the heavy position only","At the light position only","As two bands, one heavy and one light"],"Each new molecule has one ¹⁵N strand and one ¹⁴N strand. This supports semi-conservative replication."],

["e","Structure and function","How do enzymes speed up reactions?",["By lowering the activation energy through forming enzyme–substrate complexes","By raising the temperature of the reaction","By supplying energy to the substrate","By changing the products formed"],"Enzymes are globular proteins that act as biological catalysts."],
["e","Structure and function","In the induced-fit hypothesis, what happens when the substrate binds?",["The active site changes shape slightly to fit closely around the substrate","The enzyme’s primary structure changes","The active site is already an exact fit","The enzyme is denatured"],"The change in shape puts strain on bonds in the substrate. In the lock and key hypothesis the active site is a rigid, exact fit."],
["e","Structure and function","What is a cofactor?",["A non-protein substance needed for some enzymes to work","A second substrate","An inhibitor that binds to the active site","A protein that denatures the enzyme"],"Coenzymes are organic cofactors. Some cofactors are inorganic ions."],
["e","Factors affecting activity","Why does enzyme activity fall rapidly above the optimum temperature?",["Bonds holding the tertiary structure break and the active site changes shape (denaturation)","Enzyme molecules stop moving","The substrate is used up","Peptide bonds form in the active site"],"The substrate no longer fits the active site, so fewer enzyme–substrate complexes form."],
["e","Inhibitors","How does a non-competitive inhibitor reduce enzyme activity?",["It binds away from the active site and changes the shape of the active site","It binds to the active site and blocks the substrate","It raises the activation energy by cooling","It hydrolyses the substrate"],"Adding more substrate does not overcome non-competitive inhibition."],
["e","Inhibitors","Why does increasing substrate concentration reduce the effect of a competitive inhibitor?",["Substrate molecules outcompete inhibitor molecules for the active sites","The substrate denatures the inhibitor","The substrate changes the enzyme’s shape","The inhibitor binds permanently"],"A competitive inhibitor has a shape similar to the substrate, so they compete for the same site."],
["e","Biomarkers and drugs","Why can enzymes such as elastase be used as biomarkers of disease?",["They are only present or active during certain disease processes, so detecting them in samples such as sputum shows disease","They are present in all healthy cells","They cure the disease when detected","They are only found in plants"],"White blood cells can release elastase during respiratory infections. Detecting it can be used to diagnose or monitor disease."],
["e","Biomarkers and drugs","How can enzyme inhibitors be used as therapeutic drugs?",["They target enzymes that contribute to a disease process, binding to the active site","They increase the activity of all enzymes","They replace damaged enzymes","They act as substrates for the enzyme"],"Active site-directed inhibitors can block enzymes involved in disease."],
["e","Immobilised enzymes","Which is a benefit of using immobilised enzymes?",["Enzyme-free products and use in continuous flow processes","Higher activity because every active site is exposed","They never denature","They are used up in the reaction"],"Immobilised enzymes are also more stable, but some active sites are inaccessible, so activity is reduced."],
["e","Immobilised enzymes","Glucose monitoring strips and pregnancy tests are examples of…",["Diagnostic reagent strips that use enzymes as biosensors","Immobilised enzymes in continuous flow","Competitive inhibitors","Enzyme cofactors"],"A biosensor uses an enzyme or inhibitor to detect a specific substance."],
["e","Practical","In a starch–amylase reaction followed with a colorimeter and iodine, what happens to absorbance as the reaction proceeds?",["It falls as starch is hydrolysed and the blue-black colour fades","It rises as maltose is produced","It stays the same","It rises because iodine is used up"],"Less starch means less blue-black colour, so less light is absorbed."],

["v","Structure","What does a bacteriophage contain?",["DNA bounded by a protein coat","RNA bounded by a protein coat and a lipid bilayer","RNA and reverse transcriptase","Ribosomes and cytoplasm"],"Phages are viruses that invade bacteria."],
["v","Structure","Which describes the structure of HIV?",["RNA and reverse transcriptase in a protein coat, surrounded by a lipid bilayer containing glycoprotein","DNA in a protein coat with tail fibres","A cell wall of peptidoglycan around circular DNA","A nucleus, ribosomes and a cell membrane"],"HIV is a retrovirus."],
["v","Structure","What does reverse transcriptase do?",["Uses RNA to synthesise viral DNA","Uses DNA to synthesise protein","Breaks down the host cell wall","Joins amino acids together"],"This lets HIV insert a DNA copy of its genome into the host cell."],
["v","Replication","Which cells does HIV invade?",["Helper T-cells, a type of lymphocyte","Red blood cells","Platelets","Bacteria"],"Destroying helper T-cells weakens the immune system."],
["v","Replication","What happens to a bacterium after a phage invades it?",["The phage replicates inside it and the bacterial cell is destroyed","The bacterium becomes resistant","The phage divides by binary fission","The bacterium becomes a eukaryote"],"Viruses replicate inside host cells, destroying them."],
["v","Replication","Why are viruses not considered to be cells?",["They have no cytoplasm or ribosomes and can only replicate inside host cells","They contain DNA","They are too small to see with a light microscope","They contain protein"],"Viruses depend entirely on a host cell to replicate."],

["c","Ultrastructure","Which feature is found in prokaryotic cells?",["Naked, circular DNA","A nucleus","Mitochondria","Endoplasmic reticulum"],"Prokaryotes also have small ribosomes, a cell wall and possibly plasmids."],
["c","Ultrastructure","Which organelle modifies proteins and packages them into vesicles?",["Golgi apparatus","Rough endoplasmic reticulum","Lysosome","Nucleolus"],"Proteins made on ribosomes of the RER pass to the Golgi apparatus."],
["c","Ultrastructure","What is the function of the nucleolus?",["It is the location of the DNA that codes for ribosomal RNA","It stores glucose","It controls the cell cycle","It produces ATP"],"The nuclear envelope around it is a perforated double membrane."],
["c","Ultrastructure","Which structure is found in animal cells but not in plant cells?",["Centrioles","A cellulose cell wall","Chloroplasts","A large permanent vacuole"],"Centrioles are made of microtubules and help form the spindle."],
["c","Ultrastructure","The middle lamella that holds neighbouring plant cell walls together is made of…",["Calcium pectate","Cellulose","Chitin","Lignin"],"Fungal cell walls are made of chitin."],
["c","Membranes","Which part of the fluid mosaic membrane is involved in cell recognition?",["Glycoproteins and glycolipids","Cholesterol","The fatty acid tails","Hydrophilic channels"],"Carbohydrate chains act as antigens, receptors and recognition features."],
["c","Membranes","What is the function of cholesterol in animal cell membranes?",["Membrane stability","Active transport","Cell recognition","Producing ATP"],"Cholesterol regulates the fluidity of the membrane."],
["c","Microscopy","An image is 30 mm long. The actual object is 15 μm long. What is the magnification?",["×2000","×200","×20 000","×0.5"],"30 mm = 30 000 μm. 30 000 ÷ 15 = ×2000."],
["c","Microscopy","Why does an electron microscope have a higher resolution than a light microscope?",["Electrons have a much shorter wavelength than light","Electrons are larger than light waves","It uses glass lenses","Specimens are stained"],"Resolution is the ability to distinguish two points close together."],
["c","Microscopy","Why must an eyepiece graticule be calibrated with a stage micrometer?",["Graticule divisions have no fixed size; their value depends on the objective lens","The stage micrometer stains the cells","It increases the resolution","It makes the image brighter"],"Recalibrate whenever the objective lens is changed."],
["c","Cell fractionation","After homogenisation, the homogenate is centrifuged. What forms the first pellet at the lowest speed?",["Nuclei, the densest organelles","Ribosomes","Mitochondria","Lysosomes"],"Smaller, less dense organelles need faster speeds to form a pellet."],

["p","Transport","Glucose moves into a cell through a carrier protein, down its concentration gradient. This is…",["Facilitated diffusion","Active transport","Osmosis","Exocytosis"],"No ATP is used. Active transport moves substances against a gradient using carriers and energy."],
["p","Transport","How do fat-soluble substances cross the cell surface membrane?",["By diffusing through the phospholipid bilayer","Through hydrophilic protein channels only","By active transport only","By exocytosis"],"Water-soluble substances pass through hydrophilic protein channels."],
["p","Transport","A white blood cell engulfs a bacterium. This is…",["Phagocytosis, a type of endocytosis","Pinocytosis","Exocytosis","Facilitated diffusion"],"Pinocytosis is the uptake of liquid in small vesicles."],
["p","Water potential","A plant cell has ψs = −800 kPa and ψp = +300 kPa. What is its water potential?",["−500 kPa","−1100 kPa","+500 kPa","−300 kPa"],"ψcell = ψs + ψp = −800 + 300 = −500 kPa."],
["p","Water potential","A plant cell with ψcell = −400 kPa is placed in a solution with ψ = −700 kPa. What happens?",["Water leaves the cell by osmosis","Water enters the cell by osmosis","There is no net movement","The cell bursts"],"Water moves from a higher (less negative) to a lower (more negative) water potential."],
["p","Water potential","At incipient plasmolysis, the pressure potential of a plant cell is…",["Zero","Equal to the solute potential","Positive and at its maximum","Equal to −100 kPa"],"The protoplast just begins to pull away from the cell wall. At 50% plasmolysis the average ψp is zero."],
["p","Water potential","A red blood cell is placed in a concentrated salt solution. What happens?",["It loses water and shrinks (crenation)","It gains water and bursts (lysis)","It becomes turgid","It plasmolyses"],"Animal cells have no cell wall. In pure water they swell and burst (lysis)."],
["p","Practical","Potato cylinders are placed in sucrose solutions and the percentage change in mass is plotted. Where does the line cross 0% change?",["Where the solute potential of the solution equals the water potential of the tissue","Where the potato is fully turgid","Where all cells are plasmolysed","Where the solution has no sucrose"],"No net water movement means the water potentials are equal."],

["d","Cell cycle","When is DNA replicated in the cell cycle?",["During the S phase of interphase","During G1","During prophase","During cytokinesis"],"Mitosis follows the replication of DNA during the S phase."],
["d","Cell cycle","What is G0?",["A resting state that cells can enter from G1, sometimes for years","The phase where DNA replicates","The last stage of mitosis","The division of the cytoplasm"],"The gap phases also give the cell time to check conditions before the S and M phases."],
["d","Mitosis","In which stage of mitosis do sister chromatids separate and move to opposite poles?",["Anaphase","Metaphase","Prophase","Telophase"],"Spindle fibres shorten and pull the chromatids, centromere first."],
["d","Mitosis","Why is mitosis significant?",["It maintains genetic constancy: daughter cells are genetically identical","It halves the chromosome number","It produces genetic variation","It only occurs in gametes"],"Mitosis is used for growth, repair and asexual reproduction."],
["d","Anticancer drugs","How does vincristine act as an anticancer drug?",["It is a mitotic poison that inhibits microtubule (spindle) formation","It inhibits DNA synthesis in the S phase","It destroys ribosomes","It speeds up the cell cycle"],"5-fluorouracil is an antimetabolite that inhibits DNA synthesis in the S phase."],
["d","Meiosis","How does crossing over increase genetic variation?",["Chiasmata form between homologous chromosomes, exchanging sections of chromatids","Sister chromatids fuse together","The chromosome number doubles","DNA is replicated twice"],"Crossing over happens in prophase I."],
["d","Meiosis","What causes independent assortment?",["Random alignment of homologous pairs on the spindle in metaphase I","Crossing over in prophase II","DNA replication in the S phase","Cytokinesis"],"Each pair lines up independently, giving many combinations of chromosomes."],
["d","Meiosis","A diploid cell has 46 chromosomes. How many does each cell have after meiosis?",["23","46","92","12"],"Meiosis produces haploid cells with one set of chromosomes."],

["t","Tissues","Which is the correct definition of a tissue?",["A group of cells that all perform the same function","Several organs working together","A body part made of several tissues","A single specialised cell"],"An organ is a body part made of several tissues grouped together."],
["t","Ileum","Which is the correct order of tissue layers in the ileum wall, from the lumen outwards?",["Mucosa, muscularis mucosa, submucosa, muscularis externa, serosa","Serosa, submucosa, mucosa, muscularis externa, muscularis mucosa","Mucosa, submucosa, serosa, muscularis mucosa, muscularis externa","Submucosa, mucosa, muscularis externa, serosa, muscularis mucosa"],"The serosa is the outer protective and supportive layer."],
["t","Ileum","What is the role of goblet cells in the ileum?",["Secreting mucus","Absorbing fats","Antimicrobial protection","Peristalsis"],"Goblet cells are found in the columnar epithelium."],
["t","Ileum","What do Paneth cells do?",["Have an antimicrobial function, protecting the stem cells at the base of the crypts of Lieberkühn","Absorb amino acids","Secrete mucus","Transport fats into lacteals"],"The stem cells at the bottom of the crypts divide actively."],
["t","Ileum","Into which vessels are fats absorbed in a villus?",["Lacteals","Blood capillaries","Arteries","Veins"],"Amino acids and monosaccharides are absorbed into blood capillaries."],
["t","Ileum","How is the epithelium of the ileum adapted for absorption?",["A brush border of microvilli and numerous mitochondria","A thick waxy cuticle","Few mitochondria and a smooth surface","Many chloroplasts"],"Mitochondria supply ATP for active transport. Absorption also uses diffusion and pinocytosis."],
["t","Ileum","Which layer of the ileum is responsible for peristalsis?",["Muscularis externa","Muscularis mucosa","Serosa","Submucosa"],"The muscularis mucosa moves the villi."],
["t","Leaf","Why is the palisade mesophyll the main site of photosynthesis?",["Its cells are tightly packed and contain many chloroplasts for maximum light absorption","It has large air spaces","It is covered by a waxy cuticle","It contains the stomata"],"The spongy mesophyll is loosely arranged with air spaces for gas diffusion."],
["t","Leaf","What is the role of the phloem sieve-tubes in a leaf?",["Translocating sugars made in photosynthesis away from the leaf","Supplying the leaf with water and inorganic ions","Gas exchange","Reducing water loss"],"Xylem vessels supply water and inorganic ions."],

["x","Surface area to volume","A cube has sides of 2 cm. What is its surface area to volume ratio?",["3 : 1","6 : 1","1.5 : 1","12 : 1"],"Surface area = 6 × 2 × 2 = 24 cm². Volume = 2 × 2 × 2 = 8 cm³. 24 ÷ 8 = 3."],
["x","Surface area to volume","Why do large organisms need specialised exchange surfaces and mass transport?",["Their surface area to volume ratio is small, so many cells are not in contact with the environment","Their surface area to volume ratio is large","They have lower metabolic rates","Diffusion is fast over long distances"],"As size increases, surface area increases less than volume."],
["x","Fick’s law","According to Fick’s law, the rate of diffusion is proportional to…",["Surface area × difference in concentration ÷ length of diffusion path","Length of diffusion path × surface area","Surface area ÷ difference in concentration","Difference in concentration × length of diffusion path"],"A large surface area, steep gradient and short diffusion path all increase the rate."],
["x","Gas exchange in plants","What is the compensation point?",["When the rate of photosynthesis equals the rate of respiration, so there is no net gas exchange","When stomata close at night","When the rate of respiration is zero","When photosynthesis is at its maximum"],"At midday, net gas exchange is mostly photosynthetic. At night it is only respirational."],
["x","Gas exchange in mammals","What is the role of surfactant in the alveoli?",["It reduces the surface tension of the moisture layer","It kills bacteria","It increases the thickness of the alveolar wall","It carries oxygen to the blood"],"This stops the alveoli collapsing."],
["x","Gas exchange in mammals","Which describes the respiratory surface in the lungs?",["Simple squamous epithelium of the alveoli and squamous endothelium of the capillary wall","Ciliated columnar epithelium","Thick cartilage rings","A waxy cuticle"],"Two thin, flat cell layers give a short diffusion path."],
["x","Breathing","What happens during inspiration?",["Intercostal muscles and diaphragm contract, thorax volume increases and pressure decreases","The diaphragm relaxes and domes upwards","Thorax volume decreases and pressure increases","The ribcage moves down and in"],"Air moves in from higher to lower pressure. This mass flow maintains diffusion gradients."],
["x","Breathing","What is the correct order of the respiratory tree?",["Trachea, bronchi, bronchioles, alveolar ducts, alveoli","Bronchi, trachea, alveoli, bronchioles, alveolar ducts","Trachea, bronchioles, bronchi, alveoli, alveolar ducts","Alveoli, alveolar ducts, bronchi, bronchioles, trachea"],"Air passes through these in order to reach the respiratory surface."],
["x","Breathing","How does emphysema reduce gas exchange?",["Alveolar walls break down, reducing the surface area","Cilia beat faster","The alveolar walls become thinner","More surfactant is produced"],"Smoking also damages cilia and can cause bronchitis and lung cancer."],
["x","Respirometer","Why is potassium hydroxide (KOH) used in a simple respirometer?",["It absorbs CO₂, so the movement of the fluid shows O₂ consumption","It produces oxygen","It absorbs oxygen","It kills the organisms"],"Without KOH, the movement shows the net difference between CO₂ produced and O₂ used."],

["tp","Root uptake","How do root hair cells take up most mineral ions?",["By active transport","By osmosis","By mass flow","By phagocytosis"],"Water is taken up by osmosis."],
["tp","Pathways","What is the apoplast pathway?",["Movement of water along the cellulose cell walls","Movement through the protoplasts via plasmodesmata","Movement through the phloem","Movement through vacuoles only"],"The symplast pathway goes through protoplasts connected by plasmodesmata."],
["tp","Pathways","What is the role of the endodermis in the root?",["It ensures water enters the stele by the symplast pathway","It carries sugars to the root tip","It is the main site of photosynthesis","It absorbs mineral ions by diffusion"],"The Casparian strip blocks the apoplast pathway at the endodermis."],
["tp","Xylem","Which theory explains water moving up the xylem as a continuous column?",["Cohesion-tension","Mass flow from source to sink","Active transport into the vessels","Osmosis in the phloem"],"Transpiration creates a negative pressure in leaf xylem. Cohesive and adhesive forces of water maintain the column."],
["tp","Transpiration","What is the main route of transpiration?",["The stomata","The cuticle","The xylem","The root hairs"],"The cuticle is a minor alternative route."],
["tp","Transpiration","Which change would increase the rate of transpiration?",["Stronger air currents","Higher humidity","Lower temperature","Lower light intensity"],"Air currents remove water vapour near the stomata, keeping the diffusion gradient steep."],
["tp","Phloem","Phloem tissue is made of…",["Sieve-tube elements and companion cells","Lignified vessels","Root hair cells","Guard cells"],"Xylem has protoxylem and metaxylem vessels with distinctive lignification."],
["tp","Translocation","Which two properties of translocation in the phloem does the evidence support?",["It involves energy expenditure and two-way flow","It is passive and one-way","It only moves water","It happens only at night"],"Theories of translocation are not required at AS."],
["tp","Adaptations","Marram grass has rolled leaves, hairs and sunken stomata. It is a…",["Xerophyte","Hydrophyte","Mesophyte","Protoctist"],"These features trap humid air and reduce water loss."],
["tp","Adaptations","Which is an adaptation of a hydrophyte?",["Stomata mainly on the upper surface of the leaves","Sunken stomata","A thick waxy cuticle","Deep roots"],"Hydrophytes also have a prominent air space system (aerenchyma)."],

["h","Heart","Which valve stops blood flowing back from the aorta into the left ventricle?",["Semilunar valve","Bicuspid valve","Tricuspid valve","Atrioventricular valve"],"Semilunar valves are at the base of the aorta and the pulmonary artery."],
["h","Heart","Where is the wave of excitation first generated?",["Sinoatrial node (SA-node)","Atrioventricular node (AV-node)","Bundle of His","Purkinje fibres"],"Heart muscle is myogenic. The AV-node delays the wave so the atria finish contracting first."],
["h","Cardiac cycle","During ventricular systole, what is the state of the valves?",["AV valves closed, semilunar valves open","AV valves open, semilunar valves closed","All valves open","All valves closed"],"Ventricular pressure is higher than atrial pressure and arterial pressure."],
["h","Circulation","What is meant by double circulation?",["Blood passes through the heart twice for each complete circuit of the body","The heart has two atria","Blood flows in two directions in each vessel","Each organ has two arteries"],"There is a pulmonary circulation to the lungs and a systemic circulation to the body."],
["h","Blood vessels","Why do arteries contain numerous elastic fibres?",["To allow distension of the artery and the development of a pulse wave","To prevent backflow","To allow exchange with tissues","To make the lumen as large as possible"],"Smooth muscle allows vasoconstriction and vasodilation."],
["h","Blood vessels","Which feature helps veins return blood to the heart?",["Valves and a large lumen","Thick elastic walls","A single layer of endothelium only","Numerous smooth muscle fibres"],"Veins also contain abundant fibrous tissue for protection."],
["h","Blood","Which cells produce antibodies?",["B-cells","T-cells","Red blood cells","Platelets"],"T-cells are involved in cell-mediated immunity."],
["h","Clotting","Which reaction is the final stage of blood clotting?",["Soluble fibrinogen is converted into insoluble fibrin","Prothrombin is converted into fibrinogen","Platelets are converted into thromboplastin","Fibrin is converted into prothrombin"],"Thromboplastin, calcium ions, vitamin K and clotting factors help convert prothrombin to thrombin, which converts fibrinogen to fibrin."],
["h","Haemoglobin","How many oxygen molecules can one haemoglobin molecule carry?",["4","1","2","8"],"Haemoglobin is a conjugated protein with four haem groups, each containing Fe²⁺."],
["h","Haemoglobin","An increase in pCO₂ shifts the oxygen dissociation curve to the right. This means…",["More oxygen is unloaded to respiring tissues","Haemoglobin has a higher affinity for oxygen","Less oxygen is unloaded","The curve becomes a straight line"],"This is the Bohr effect. A rise in temperature or fall in pH has the same effect."],
["h","Myoglobin","Why is the dissociation curve for myoglobin to the left of haemoglobin’s?",["Myoglobin has a higher affinity for oxygen and only releases it when pO₂ in muscle is very low","Myoglobin has a lower affinity for oxygen","Myoglobin carries carbon dioxide","Myoglobin is found in plasma"],"This lets aerobic respiration continue for longer and delays anaerobic respiration."],
["h","Altitude","How does the body respond to high altitude training?",["More red blood cells are produced","Haemoglobin stops binding oxygen","Breathing rate falls","The heart stops beating faster"],"There is a lower pO₂ in the air at high altitude."],

["a","Ecological factors","Which is an edaphic factor?",["Soil pH","Light intensity","Predation","Day length"],"Edaphic factors relate to the soil. Climatic factors include temperature and light."],
["a","Ecological factors","Which is a biotic factor?",["Competition","Temperature","Soil aeration","Water availability"],"Biotic factors include competitors, predators and the accumulation of waste."],
["a","Adaptation","Sunken stomata are an example of which type of adaptation?",["Morphological","Behavioural","Physiological","Edaphic"],"Adaptations can be behavioural, physiological or morphological."],
["a","Sampling","Which method gives an unbiased sample of ground plants in a field?",["Quadrats placed at random coordinates","Quadrats placed where plants look interesting","A pitfall trap","A sweep net"],"Use a random number generator or tables to choose coordinates."],
["a","Sampling","Which method is best for studying how vegetation changes from a hedge into a field?",["A belt transect","Random quadrats","A pooter","A sweep net"],"A transect samples along a line across an environmental gradient."],
["a","Sampling","Which device is used to sample ground-dwelling invertebrates?",["Pitfall trap","Pin frame","Quadrat","Sweep net"],"Pooters collect small insects, and sweep nets sample insects in long grass."],
["a","Sampling","Why is percentage cover usually used for plants rather than counting individuals?",["It is very difficult to count all the individual plants","Plants move around","It gives the density directly","Plants are too large to count"],"Animals are usually counted as numbers of organisms."],

["b","Simpson’s index","CCEA uses D = Σn(n−1) ÷ N(N−1). A lower value of D means…",["Greater species diversity","Lower species diversity","Fewer individuals were counted","The sampling was not random"],"With this formula, low D values show a more diverse habitat."],
["b","Simpson’s index","A quadrat contains 4 daisies, 3 buttercups and 3 clover plants. Using D = Σn(n−1) ÷ N(N−1), what is D?",["0.27","0.73","0.33","2.7"],"Σn(n−1) = 12 + 6 + 6 = 24. N(N−1) = 10 × 9 = 90. 24 ÷ 90 = 0.27."],
["b","Biodiversity","What is genetic diversity?",["The diversity of genes within a species","The number of species in an ecosystem","The variety of ecosystems in the biosphere","The number of individuals in a population"],"Species diversity is diversity among species. Ecosystem diversity is the variety of ecosystems."],
["b","Taxonomy","Which is the correct order of taxa from largest to smallest?",["Kingdom, phylum, class, order, family, genus, species","Kingdom, class, phylum, family, order, genus, species","Phylum, kingdom, class, order, genus, family, species","Species, genus, family, order, class, phylum, kingdom"],"A genus is a group of similar, closely related species."],
["b","Taxonomy","Which describes a species?",["Individuals of common ancestry that closely resemble each other and can interbreed to produce fertile offspring","Any organisms living in the same habitat","Organisms in the same kingdom","Organisms with the same phenotype only"],"Naming uses the binomial system: genus then species."],
["b","Five kingdoms","Paramecium belongs to which kingdom?",["Protoctista","Prokaryotae","Fungi","Animalia"],"Protoctists are eukaryotic and unicellular or show limited differentiation. Paramecium is heterotrophic and Pleurococcus is autotrophic."],
["b","Five kingdoms","Which describes fungi?",["Hyphae with chitinous walls, feeding by extracellular digestion","Autotrophs with cellulose cell walls","Prokaryotes reproducing by division","Heterotrophs capable of locomotion"],"Fungi are lysotrophs (decomposers)."],
["b","Phylogenetic taxonomy","How do biochemical comparisons show that two species are closely related?",["They have a high degree of agreement in DNA base sequence and protein amino acid sequence","They live in the same habitat","They are the same colour","They have the same number of cells"],"Distantly related organisms usually show a pattern of dissimilarity."],

["hi","Agriculture","Which agricultural practice promotes biodiversity?",["Hedgerow conservation and maintenance","Monoculture","Removing field margins","Heavy pesticide use"],"Hedgerows provide habitats, food sources and corridors for wildlife."],
["hi","Agriculture","Why are predator strips left at field margins?",["To provide habitats for natural predators of crop pests","To increase the area of the crop","To stop rain reaching the crop","To attract pests into the field"],"This is part of integrated pest management."],
["hi","Agriculture","What is an advantage of biological control over chemical pesticides?",["It is specific to the pest and leaves no chemical residues","It kills all insects in the field","It acts immediately","It never needs to be repeated"],"Pesticides can kill non-target species and reduce biodiversity."],
["hi","Water pollution","Slurry and silage effluent entering a river is an example of…",["Organic pollution","Mineral enrichment by fertiliser","Thermal pollution","Acid rain"],"Organic pollution provides food for decomposers, raising the BOD."],
["hi","Water pollution","What is biological oxygen demand (BOD)?",["The amount of oxygen used by microorganisms in a water sample over a set time","The amount of oxygen fish need","The oxygen concentration in clean water","The oxygen produced by algae"],"A high BOD means a lot of organic matter is being decomposed."],
["hi","Eutrophication","In eutrophication, why does the oxygen concentration of the water fall?",["Aerobic bacteria decomposing dead plants and algae use up the oxygen","Algae use up all the oxygen in photosynthesis","Fertiliser reacts with oxygen","Fish use more oxygen in warm water"],"Fertiliser run-off causes an algal bloom, which blocks light so plants die and are decomposed."],
["hi","Conservation","What does ASSI stand for?",["Area of Special Scientific Interest","Area of Scientific Species Inspection","Agricultural Site of Special Interest","Approved Site for Species Improvement"],"Other initiatives include Special Areas of Conservation and Biodiversity Action Plans."],
["hi","Climate change","Which is a likely consequence of climate change for local wildlife?",["Shifts in ecological ranges and local extinctions","All species increase in number","No change in species distribution","Every habitat becomes more diverse"],"This can reduce species and ecosystem biodiversity."]
];
const root=$$("#run");
let st={phase:"idle"},clipN=0;
const store={get(k){try{return +localStorage.getItem(k)||0}catch(e){return 0}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const STAIN={w1:{bg:"var(--stain-e)",nu:"var(--stain-h)"},w2:{bg:"var(--stain-mb)",nu:"var(--stain-mbn)"}};
const TIME=20;

function tissue(w){
  const s=STAIN[w]||STAIN.w1,id="tc"+(++clipN),n=14,pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,r=28+Math.random()*13;pts.push([50+Math.cos(a)*r,50+Math.sin(a)*r])}
  const mid=(p,q)=>[((p[0]+q[0])/2).toFixed(1),((p[1]+q[1])/2).toFixed(1)];
  let d=`M${mid(pts[0],pts[1]).join(",")}`;
  for(let i=1;i<=n;i++){const p=pts[i%n],q=pts[(i+1)%n];d+=`Q${p[0].toFixed(1)},${p[1].toFixed(1)} ${mid(p,q).join(",")}`}
  d+="Z";let cells="";
  for(let i=0;i<46;i++){const x=8+Math.random()*84,y=8+Math.random()*84,rx=3.5+Math.random()*2.5,ry=2.8+Math.random()*2;
    cells+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" style="fill:none;stroke:${s.nu};stroke-opacity:.3;stroke-width:.6"/><circle cx="${(x+Math.random()-.5).toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.2+Math.random()).toFixed(1)}" style="fill:${s.nu};opacity:.75"/>`}
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><path d="${d}" style="fill:${s.bg};opacity:.55"/><g clip-path="url(#${id})"><circle cx="${30+Math.random()*40}" cy="${30+Math.random()*40}" r="22" style="fill:${s.bg};opacity:.45"/>${cells}</g></svg>`;
}
function glass(lines,w,cls=""){
  return `<div class="glass ${cls}"><div class="frost">${lines.map((t,i)=>`<span class="${i?"h2":"h1"}">${esc(t)}</span>`).join("")}</div><div class="slip">${tissue(w)}</div></div>`;
}
const worldOf=scope=>scope.startsWith("w")?scope:topicById[scope].w;
const poolOf=scope=>Q.filter(q=>scope.startsWith("w")?topicById[q[0]].w===scope:q[0]===scope);
const titleOf=scope=>scope.startsWith("w")?WORLDS.find(w=>w.id===scope).name+" quiz":topicById[scope].code+" "+topicById[scope].name;

function start(scope){
  clearInterval(st.timer);
  const pool=poolOf(scope),n=scope.startsWith("w")?12:Math.min(10,pool.length);
  st={phase:"q",scope,qs:shuffle(pool).slice(0,n),i:0,score:0,streak:0,best:0,correct:0,topics:{}};
  ask();
}
const mult=()=>st.streak>=6?3:st.streak>=3?2:1;
function ask(){
  const q=st.qs[st.i],t=topicById[q[0]];
  st.order=shuffle([0,1,2,3]);st.left=TIME;st.answered=false;
  root.innerHTML=`<div class="topic">${esc(titleOf(st.scope))}</div>
  <div class="hud"><span>Slide <strong>${st.i+1}</strong>/${st.qs.length}</span><span>Score <strong>${st.score}</strong></span><span>Streak <strong>${st.streak}</strong>${st.streak>=3?` <span class="x">×${mult()}</span>`:""}</span><span>Time <strong id="rt">${TIME}</strong>s</span></div>
  <div class="bar"><i id="rbar"></i></div>
  <div class="bench">${glass([t.code,q[1],`No. ${st.i+1}`],t.w,"run-in")}</div>
  <div class="q pop">${esc(q[2])}</div>
  <div class="opts">${st.order.map((o,n)=>`<button class="opt" data-o="${o}"><kbd>${n+1}</kbd><span>${esc(q[3][o])}</span></button>`).join("")}</div>
  <div id="rafter"></div>`;
  root.querySelectorAll(".opt").forEach(b=>b.onclick=()=>answer(+b.dataset.o));
  const t0=performance.now();clearInterval(st.timer);
  st.timer=setInterval(()=>{st.left=Math.max(0,TIME-(performance.now()-t0)/1000);
    const te=$$("#rt"),b=$$("#rbar");if(!te){clearInterval(st.timer);return}
    te.textContent=Math.ceil(st.left);b.style.width=(st.left/TIME*100)+"%";if(st.left<=0)answer(-1)},100);
}
function answer(o){
  if(st.answered)return;st.answered=true;clearInterval(st.timer);
  const q=st.qs[st.i],ok=o===0,key=q[1],tp=st.topics[key]||(st.topics[key]=[0,0]);tp[1]++;
  let gained=0;
  if(ok){st.streak++;st.correct++;tp[0]++;gained=(100+Math.round(st.left*5))*mult();st.score+=gained;st.best=Math.max(st.best,st.streak)}else st.streak=0;
  root.querySelectorAll(".opt").forEach(b=>{b.disabled=true;const v=+b.dataset.o;if(v===0)b.classList.add("right");else if(v===o)b.classList.add("wrong")});
  const last=st.i===st.qs.length-1;
  $$("#rafter").innerHTML=`<div class="explain pop ${ok?"ok":"bad"}"><b>${ok?`Correct · +${gained}`:o<0?"Time's up":"Not quite"}</b>${ok?"":`<span>Answer: ${esc(q[3][0])}</span>`}<span>${esc(q[4])}</span></div>
  <div class="row" style="margin-top:12px"><button class="primary" id="rnext">${last?"See results":"Next slide"}</button></div>`;
  $$("#rnext").onclick=next;$$("#rnext").focus();
}
function next(){st.i++;st.i<st.qs.length?ask():results()}
function results(){
  st.phase="end";
  const pct=Math.round(st.correct/st.qs.length*100),key="sr-"+st.scope,prev=store.get(key),isBest=pct>prev;if(isBest)store.set(key,pct);
  const grade=pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=50?"D":pct>=40?"E":"U";
  const rows=Object.entries(st.topics).sort((a,b)=>a[1][0]/a[1][1]-b[1][0]/b[1][1]),weak=rows.filter(([,v])=>v[0]<v[1]).map(([k])=>k);
  root.innerHTML=`<div class="topic">Results · ${esc(titleOf(st.scope))}</div>
  <div class="row" style="gap:28px;align-items:flex-end"><div><div class="big">${st.correct}/${st.qs.length}</div><div class="muted">${pct}% correct${isBest?" · new best":""}</div></div>
  <div><div class="big" style="color:var(--gold)">${grade}</div><div class="muted">rough grade</div></div>
  <div><div class="big">${st.score}</div><div class="muted">points · best streak ${st.best}</div></div></div>
  <p class="muted" style="font-size:13px">The grade is a rough guide from this quiz only, not a CCEA grade boundary.</p>
  <h3>By subtopic</h3>
  <div class="breakdown">${rows.map(([k,v])=>`<div><span>${esc(k)}</span><span>${v[0]}/${v[1]}</span></div>`).join("")}</div>
  ${weak.length?`<p><b>Revise next:</b> ${weak.map(esc).join(", ")}</p>`:`<p><b>Clean sweep.</b></p>`}
  <div class="row"><button class="primary" id="ragain">Play again</button><a class="ghost" style="text-decoration:none;color:var(--fg)" href="#${WORLDS.find(w=>w.id===worldOf(st.scope)).hash}">Back to ${WORLDS.find(w=>w.id===worldOf(st.scope)).num}</a></div>`;
  $$("#ragain").onclick=()=>start(st.scope);$$("#ragain").focus();
}
document.addEventListener("keydown",e=>{
  if($$("#runwrap").hidden||st.phase!=="q")return;
  if(!st.answered&&/^[1-4]$/.test(e.key)){const b=root.querySelectorAll(".opt")[+e.key-1];b&&b.click()}
  else if(st.answered&&e.key==="Enter"&&document.activeElement?.id!=="rnext")next();
});
return {start,stop:()=>clearInterval(st.timer),glass,worldOf,count:scope=>poolOf(scope).length,best:scope=>store.get("sr-"+scope)};
})();
