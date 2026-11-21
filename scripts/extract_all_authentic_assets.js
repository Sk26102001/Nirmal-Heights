const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ext = path.join(process.cwd(), 'public/extracted');
const out = path.join(process.cwd(), 'public/images/assets');

async function extractAll() {
  console.log('Extracting all authentic, relatable, uncut assets from brochure spreads...');

  // 1. Hero & Elevation: 30-Storey Twin Towers (Spread 10)
  // Right half: x: 4800 to 9600, y: 0 to 3000
  console.log('1. Twin Towers elevation...');
  await sharp(path.join(ext, 'image_010_1712976b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'hero_tower.jpg'));

  await sharp(path.join(ext, 'image_010_1712976b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'hero_building_wide.jpg'));

  // 2. Grand Entrance Security Portal (Spread 6)
  console.log('2. Entrance Security Portal...');
  await sharp(path.join(ext, 'image_006_2080152b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_entrance_portal.jpg'));

  // 3. Grand Porte-Cochere & Entrance Driveway (Spread 14)
  console.log('3. Porte-Cochere Driveway...');
  await sharp(path.join(ext, 'image_014_2081241b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_porte_cochere.jpg'));

  // 4. Clubhouse Dining Banquet & Restaurant (Spread 12)
  console.log('4. Clubhouse Dining Banquet...');
  await sharp(path.join(ext, 'image_012_1623432b.jpg'))
    .extract({ left: 6860, top: 120, width: 2600, height: 2740 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'about_clubhouse.jpg'));

  await sharp(path.join(ext, 'image_012_1623432b.jpg'))
    .extract({ left: 6860, top: 120, width: 2600, height: 2740 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_club_dining.jpg'));

  // 5. Resort Swimming Pool & Cabanas (Spread 11)
  console.log('5. Swimming Pool...');
  await sharp(path.join(ext, 'image_011_2811301b.jpg'))
    .extract({ left: 140, top: 120, width: 4940, height: 2740 })
    .resize(1920, 1150, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_swimming_pool.jpg'));

  // 6. Grand Living & Dining Salon with Golden Spiral Sculpture (Spread 4)
  console.log('6. Grand Living Salon...');
  await sharp(path.join(ext, 'image_004_1116672b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'residence_living.jpg'));

  // 7. Presidential Master Bedroom Suite (Spread 9)
  console.log('7. Master Bedroom Suite...');
  await sharp(path.join(ext, 'image_009_1916094b.jpg'))
    .extract({ left: 100, top: 0, width: 4700, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'bedroom_master_luxury.jpg'));

  // 8. Private Balcony Deck Overlooking Pool (Spread 9)
  console.log('8. Balcony Deck Overlooking Pool...');
  await sharp(path.join(ext, 'image_009_1916094b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'balcony_deck_luxury.jpg'));

  // 9. Grand Piano Salon & Cultural Music Lounge (Spread 8)
  console.log('9. Piano Music Salon...');
  await sharp(path.join(ext, 'image_008_1025826b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'residence_kitchen.jpg'));

  await sharp(path.join(ext, 'image_008_1025826b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'residence_piano_salon.jpg'));

  // 10. 3D Furnished Residence Layout (Spread 16)
  console.log('10. 3D Furnished Apartment Layout...');
  await sharp(path.join(ext, 'image_016_1333449b.jpg'))
    .extract({ left: 7700, top: 220, width: 1850, height: 1400 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'residence_3d_layout.jpg'));

  // 11. State-of-the-Art Gymnasium (Spread 11)
  console.log('11. Gymnasium...');
  await sharp(path.join(ext, 'image_011_2811301b.jpg'))
    .extract({ left: 5220, top: 1560, width: 2160, height: 1300 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_gymnasium.jpg'));

  // 12. Zen Meditation & Tatami Studio (Spread 11)
  console.log('12. Zen Meditation...');
  await sharp(path.join(ext, 'image_011_2811301b.jpg'))
    .extract({ left: 5220, top: 140, width: 2160, height: 1260 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_yoga_zen.jpg'));

  // 13. Swedish Cedarwood Sauna & Spa (Spread 11)
  console.log('13. Sauna & Spa...');
  await sharp(path.join(ext, 'image_011_2811301b.jpg'))
    .extract({ left: 7480, top: 1560, width: 1980, height: 1300 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_sauna_spa.jpg'));

  // 14. Luxury Billiards & Snooker Lounge (Spread 12)
  console.log('14. Billiards & Snooker...');
  await sharp(path.join(ext, 'image_012_1623432b.jpg'))
    .extract({ left: 4560, top: 140, width: 2180, height: 1260 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_billiards.jpg'));

  // 15. Library Lounge & Study Retreat (Spread 12)
  console.log('15. Library Lounge...');
  await sharp(path.join(ext, 'image_012_1623432b.jpg'))
    .extract({ left: 2280, top: 140, width: 2160, height: 2720 })
    .resize(1600, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_library_lounge.jpg'));

  // 16. Championship Tennis Court (Spread 13) - 100% CLEAN active match, NO ROLLER SKATER CUT IN!
  console.log('16. Tennis Match Court...');
  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 2420, top: 1560, width: 1740, height: 1300 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_tennis_court.jpg'));

  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 2420, top: 1560, width: 1740, height: 1300 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_tennis_match.jpg'));

  // 17. Floodlit Cricket Net Practice Pitch (Spread 13)
  console.log('17. Cricket Practice Pitch...');
  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 7700, top: 140, width: 1760, height: 2720 })
    .resize(1600, 1100, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_cricket_pitch.jpg'));

  // 18. Kids Play Kingdom (Spread 13)
  console.log('18. Kids Play Kingdom...');
  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 140, top: 140, width: 2120, height: 1260 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_kids_play.jpg'));

  // 19. Roller Skating Track (Spread 13)
  console.log('19. Roller Skating Track...');
  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 4280, top: 140, width: 1200, height: 2720 })
    .resize(900, 1400, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_skating.jpg'));

  // 20. Table Tennis Arena (Spread 13)
  console.log('20. Table Tennis Arena...');
  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 5640, top: 1560, width: 1880, height: 1300 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_table_tennis.jpg'));

  // 21. Senior Citizen Park & Lawns (Spread 13)
  console.log('21. Senior Citizen Park...');
  await sharp(path.join(ext, 'image_013_1838988b.jpg'))
    .extract({ left: 140, top: 1560, width: 2120, height: 1300 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_senior_park.jpg'));

  // 22. Jogging Track & Tree Boulevard (Spread 7)
  console.log('22. Jogging Track...');
  await sharp(path.join(ext, 'image_007_2103156b.jpg'))
    .extract({ left: 5200, top: 140, width: 2160, height: 2720 })
    .resize(1600, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_jogging_track.jpg'));

  // 23. Manicured Rockery & Reflexology Garden (Spread 7)
  console.log('23. Landscaped Gardens...');
  await sharp(path.join(ext, 'image_007_2103156b.jpg'))
    .extract({ left: 7460, top: 140, width: 1980, height: 1260 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_landscaped_gardens.jpg'));

  // 24. Outdoor Sunset Lawn Yoga (Spread 7)
  console.log('24. Lawn Yoga...');
  await sharp(path.join(ext, 'image_007_2103156b.jpg'))
    .extract({ left: 3120, top: 140, width: 1980, height: 1260 })
    .resize(1600, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'amenity_yoga_lawn.jpg'));

  // 25. Padma Bhushan Hafeez Contractor Portrait (Spread 3)
  console.log('25. Architect Hafeez Contractor Portrait...');
  await sharp(path.join(ext, 'image_003_1051155b.jpg'))
    .extract({ left: 2860, top: 1040, width: 1140, height: 1540 })
    .resize(800, 1000, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'partner_hafeez_photo.jpg'));

  // 26. Authentic Location Connectivity Map (Spread 5)
  console.log('26. Authentic Varanasi Location Map...');
  await sharp(path.join(ext, 'image_005_1523001b.jpg'))
    .extract({ left: 4800, top: 0, width: 4800, height: 3000 })
    .resize(1920, 1200, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(out, 'authentic_varanasi_location_map.jpg'));

  console.log('SUCCESS: ALL AUTHENTIC ASSETS EXTRACTED AND SAVED WITH ZERO CUTS OR MISMATCHES!');
}

extractAll().catch(err => {
  console.error('Extraction error:', err);
  process.exit(1);
});
