import al from './al.json';
import at from './at.json';
import au from './au.json';
import be from './be.json';
import bg from './bg.json';
import bs from './bs.json';
import ca from './ca.json';
import ch from './ch.json';
import cn from './cn.json';
import cy from './cy.json';
import cz from './cz.json';
import de from './de.json';
import dk from './dk.json';
import ee from './ee.json';
import es from './es.json';
import fi from './fi.json';
import fr from './fr.json';
import ge from './ge.json';
import gi from './gi.json';
import gr from './gr.json';
import hr from './hr.json';
import hu from './hu.json';
import ie from './ie.json';
import il from './il.json';
import is from './is.json';
import it from './it.json';
import jp from './jp.json';
import kr from './kr.json';
import li from './li.json';
import lt from './lt.json';
import lu from './lu.json';
import lv from './lv.json';
import mc from './mc.json';
import me from './me.json';
import mx from './mx.json';
import nl from './nl.json';
import no from './no.json';
import nz from './nz.json';
import pl from './pl.json';
import pt from './pt.json';
import ro from './ro.json';
import se from './se.json';
import sg from './sg.json';
import sk from './sk.json';
import sl from './sl.json';
import sm from './sm.json';
import tw from './tw.json';
import ua from './ua.json';
import uk from './uk.json';
import us from './us.json';

export type localization = typeof us;
export type countries = keyof typeof translations;

const translations = {
  al: { ...us, ...al },
  at: { ...us, ...at },
  au: { ...us, ...au },
  be: { ...us, ...be },
  bg: { ...us, ...bg },
  bs: { ...us, ...bs },
  ca: { ...us, ...ca },
  ch: { ...us, ...ch },
  cn: { ...us, ...cn },
  cy: { ...us, ...cy },
  cz: { ...us, ...cz },
  de: { ...us, ...de },
  dk: { ...us, ...dk },
  ee: { ...us, ...ee },
  es: { ...us, ...es },
  fi: { ...us, ...fi },
  fr: { ...us, ...fr },
  ge: { ...us, ...ge },
  gi: { ...us, ...gi },
  gr: { ...us, ...gr },
  hr: { ...us, ...hr },
  hu: { ...us, ...hu },
  ie: { ...us, ...ie },
  il: { ...us, ...il },
  is: { ...us, ...is },
  it: { ...us, ...it },
  jp: { ...us, ...jp },
  kr: { ...us, ...kr },
  li: { ...us, ...li },
  lt: { ...us, ...lt },
  lu: { ...us, ...lu },
  lv: { ...us, ...lv },
  mc: { ...us, ...mc },
  me: { ...us, ...me },
  mx: { ...us, ...mx },
  nl: { ...us, ...nl },
  no: { ...us, ...no },
  nz: { ...us, ...nz },
  pl: { ...us, ...pl },
  pt: { ...us, ...pt },
  ro: { ...us, ...ro },
  se: { ...us, ...se },
  sg: { ...us, ...sg },
  sk: { ...us, ...sk },
  sl: { ...us, ...sl },
  sm: { ...us, ...sm },
  tw: { ...us, ...tw },
  ua: { ...us, ...ua },
  uk: { ...us, ...uk },
  us,
};

export default translations;
