/********************************************************************
* Author: Matias Grioni
* Created: 15 November 2015
*
* The logic behind the generation of music. Given a set of notes,
* the key we are in is determined and from there an accompanying
* song is created.
********************************************************************/

var Generator = function(genre, frequencies) {
    /*chordprogression = Generator.prototype.chordprogression;
    chordsinkeys = Generator.prototype.chordsinkeys;
    chords = Generator.prototype.chords;
    musicalKeys = Generator.prototype.musicalKeys;*/

    this.genre = genre;
    this.key = this._findKey(frequencies);
};


Generator.prototype.load = function(finish) {
    var that = this;
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
        instrument: ["synth_drum","electric_guitar_clean","string_ensemble_1","synth_choir","acoustic_guitar_steel","melodic_tom", "acoustic_grand_piano"],
		onprogress: function(state, progress) {
			console.log(state, progress);
		},

		onsuccess: function() {
            if (that.genre == "electronic") {
                var random = Math.floor((Math.random() * 10) + 1);

                var delay = .8; // play one note every quarter second
                var note = 50; // the MIDI note
                var note2 = 65;
                var velocity = 127; // how hard the note hits

                var random1 = Math.floor((Math.random() * 6) + 1);
			    var usethisprogression = that.chordprogression["set"+random1];
				var usethesenotes = [];
				for(var i=0; i<4; i++){
					usethesenotes.push(that.chordsinkeys[that.key][usethisprogression[i] - 1]);
				}

                MIDI.programChange(0, 54);
                MIDI.programChange(1, 118);
                MIDI.setVolume(0, 127);
                MIDI.setVolume(1, 63);

                // play the note
                var time = 2;
                for(var i = 0; i< 4; i++) {
                    MIDI.chordOn(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]], velocity, time);
                    MIDI.chordOff(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]],time+delay);
					MIDI.chordOn(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]], velocity, time+2*delay);
					MIDI.chordOff(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]],time+3*delay);

                    MIDI.noteOn(1, note, velocity, time);
                    if (random == 1 || random==2) {
                        MIDI.noteOn(1, note, velocity, time+.5*delay);
                    }

                    MIDI.noteOn(1, note, velocity, time+delay);
                    if (random == 3 || random==4) {
                        MIDI.noteOn(1, note, velocity, time+1.5*delay);
                    }

                    MIDI.noteOn(1, note, velocity, time+2*delay);
                    if (random == 5 || random==6) {
                        MIDI.noteOn(1, note, velocity, time+2.5*delay);
                    }
                    
                    MIDI.noteOn(1, note, velocity, time+3*delay);
                    if (random == 7 || random==8) {
                        MIDI.noteOn(1, note, velocity, time+3.5*delay);
                    }

                    time = time+4*delay;
                }
            } else if (that.genre == "rock") {
                var random = Math.floor((Math.random() * 10) + 1);

                var delay = .5; // play one note every quarter second
                var note = 50; // the MIDI note
                var note2 = 85;
                var velocity = 127; // how hard the note hits

                var random1 = Math.floor((Math.random() * 6) + 1);
				var usethisprogression = that.chordprogression["set"+random1];
				var usethesenotes = [];
				for(var i=0; i<4; i++){
					usethesenotes.push(that.chordsinkeys[that.key][usethisprogression[i] - 1]);
    			}

                MIDI.programChange(0, 0);
                MIDI.programChange(1, 117);
                //MIDI.programChange(2, 65);
                MIDI.setVolume(0, 127);
                MIDI.setVolume(1, 127);
                //MIDI.setVolume(2, 65);

                // play the note
                var time = 2;
                for(var k = 0; k < 2; k++) {
                    for(var i = 0; i< 4; i++) {
                        MIDI.chordOn(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]], velocity, time);
						MIDI.chordOff(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]],time+delay);
						MIDI.chordOn(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]], velocity, time+2*delay);
						MIDI.chordOff(0, [that.chords[usethesenotes[i]][0], that.chords[usethesenotes[i]][1], that.chords[usethesenotes[i]][2]],time+3*delay);

                        MIDI.noteOn(1, note, velocity, time);
                        if (random == 1 || random==2) {
                            MIDI.noteOn(1, note, velocity, time+.5*delay);
                        }

                        MIDI.noteOn(1, note2, velocity, time+delay);
                        if (random == 3 || random==4) {
                            MIDI.noteOn(1, note, velocity, time+1.5*delay);
                        }

                        MIDI.noteOn(1, note, velocity, time+2*delay);
                        if (random == 5 || random==6) {
                            MIDI.noteOn(1, note, velocity, time+2.5*delay);
                        }

                        MIDI.noteOn(1, note2, velocity, time+3*delay);
                        if (random == 7 || random==8) {
                            MIDI.noteOn(1, note, velocity, time+3.5*delay);
                        }
                        time = time+4*delay;
                    }
                }
            } else if (that.genre == "acoustic") {
                var random1 = Math.floor((Math.random() * 6) + 1);
                var delay = .8;
                var note = 50; // the MIDI note
                var note2 = 85;
                var velocity = 127; // how hard the note hits

                MIDI.programChange(0, 0);
                MIDI.programChange(1, 118);
                MIDI.setVolume(0, 127);
                MIDI.setVolume(1, 118);

                var usethisprogression = that.chordprogression["set"+random1];
                var usethesenotes = [];
                for(var i=0; i<4; i++){
                    usethesenotes.push(that.chordsinkeys[that.key][usethisprogression[i] - 1]);
                }

                // play the note
                var time = 2;
                for(var i = 0; i< 4; i++) {
                        MIDI.chordOn(0, [that.chords[usethesenotes[0]][0], that.chords[usethesenotes[0]][1], that.chords[usethesenotes[0]][2]], velocity, time);
                            time = time + delay;
                }

                var time = 2+4*delay;
                for(var i = 0; i< 4; i++) {
                        MIDI.chordOn(0, [that.chords[usethesenotes[1]][0], that.chords[usethesenotes[1]][1], that.chords[usethesenotes[1]][2]], velocity, time);
                            time = time + delay;
                }

                var time = 2+8*delay;
                for(var i = 0; i< 4; i++) {
                        MIDI.chordOn(0, [that.chords[usethesenotes[2]][0], that.chords[usethesenotes[2]][1], that.chords[usethesenotes[2]][2]], velocity, time);
                            time = time + delay;
                }

                var time = 2+12*delay;
                for(var i = 0; i< 4; i++) {
                        MIDI.chordOn(0, [that.chords[usethesenotes[3]][0], that.chords[usethesenotes[3]][1], that.chords[usethesenotes[3]][2]], velocity, time);
                            time = time + delay;
                }
            } else if (that.genre == "orchestral") {
                var random1 = Math.floor((Math.random() * 6) + 1);
                var delay = .8;
                var note = 30; // the MIDI note
                var note2 = 85;
                var velocity = 127; // how hard the note hits

                MIDI.programChange(0, 48);
                MIDI.programChange(1, 117);
                MIDI.setVolume(0, 127);
                MIDI.setVolume(1, 118);

                var usethisprogression = that.chordprogression["set"+random1];
                var usethesenotes = [];
                for(var i=0; i<4; i++){
                    usethesenotes.push(that.chordsinkeys[that.key][usethisprogression[i] - 1]);
                }
                // play the note
                var time = 2;
                for(var i = 0; i< 4; i++) {
                    if(i==0 || i==2) {
                        MIDI.noteOn(1, note, velocity, time);
                        MIDI.noteOn(1, note, velocity, time+ .5*delay);
                    }

                    MIDI.chordOn(0, [that.chords[usethesenotes[0]][0], that.chords[usethesenotes[0]][1], that.chords[usethesenotes[0]][2]], velocity, time);
                    MIDI.chordOff(0, [that.chords[usethesenotes[0]][0], that.chords[usethesenotes[0]][1], that.chords[usethesenotes[0]][2]], time+ .5*delay);

                    if(i==1 || i==3) {
                        MIDI.noteOn(1, note2, velocity, time);
                    }

                    time = time + delay;
                }
                var time = 2+4*delay;
                for(var i = 0; i< 4; i++) {

                    MIDI.chordOn(0, [that.chords[usethesenotes[1]][0], that.chords[usethesenotes[1]][1], that.chords[usethesenotes[1]][2]], velocity, time);
                    MIDI.chordOff(0, [that.chords[usethesenotes[1]][0], that.chords[usethesenotes[1]][1], that.chords[usethesenotes[1]][2]],time+.5*delay);

                    if(i==0 || i==2) {
                        MIDI.noteOn(1, note, velocity, time);
                        MIDI.noteOn(1, note, velocity, time+ .5*delay);
                    }
                    if(i==1 || i==3) {
                        MIDI.noteOn(1, note2, velocity, time);
                    }

                    time = time + delay;
                }

                var time = 2+8*delay;
                for(var i = 0; i< 4; i++) {
                    MIDI.chordOn(0, [that.chords[usethesenotes[2]][0], that.chords[usethesenotes[2]][1], that.chords[usethesenotes[2]][2]], velocity, time);
                    MIDI.chordOff(0, [that.chords[usethesenotes[2]][0], that.chords[usethesenotes[2]][1], that.chords[usethesenotes[2]][2]], time+.5*delay);

                    if(i==0 || i==2) {
                        MIDI.noteOn(1, note, velocity, time);
                        MIDI.noteOn(1, note, velocity, time+ .5*delay);
                    }
                    if(i==1 || i==3) {
                        MIDI.noteOn(1, note2, velocity, time);
                    }

                    time = time + delay;
                }

                var time = 2+12*delay;
                for(var i = 0; i< 4; i++) {
                    MIDI.chordOn(0, [that.chords[usethesenotes[3]][0], that.chords[usethesenotes[3]][1], that.chords[usethesenotes[3]][2]], velocity, time);
                    MIDI.chordOff(0, [that.chords[usethesenotes[3]][0], that.chords[usethesenotes[3]][1], that.chords[usethesenotes[3]][2]], velocity, time+.5*delay);

                    if(i==0 || i==2) {
                         MIDI.noteOn(1, note, velocity, time);
                         MIDI.noteOn(1, note, velocity, time+ .5*delay);
                    }

                    if(i==1 || i==3) {
                        MIDI.noteOn(1, note2, velocity, time);
                    }

                    time = time + delay;
                }
            }

            finish();
        }
    });
};

Generator.prototype._findKey = function(frequencies) {
    var notes = [];
    var max = {"key": "", "freq": -1};
    frequencies.sort(function(a, b) {
        return b.freq - a.freq;
    });

    var possibleKeys = Object.keys(this.musicalKeys);
    var i = 0
    while(i < frequencies.length - 3 && possibleKeys > 1) {
        var note = frequencies[i];

        var j = 0;
        while(j < possibleKeys.length) {
            var curKey = possibleKeys[j];

            if(!(note.key in this.musicalKeys[curKey])) {
                possibleKeys.splice(j, 1);
                continue;
            }
            
            j++;
        }

        i++;
    }

    return possibleKeys[0];
}

Generator.prototype.musicalKeys = {
    c: ["c","d","e","f","g","a","b"],
    g: ["g","a","b","c","d","e","f"],
    d: ["d","e","fsharp","g","a","b","csharp"],
    a: ["a","b","csharp","d","e","fsharp","gsharp"],
    e: ["e","fsharp","gsharp","a","b","csharp","dsharp"],
    b: ["b","csharp","dsharp","e","fsharp","gsharp","asharp"],
    fsharp: ["fsharp","gsharp","asharp","b","csharp","dsharp","esharp"],
    csharp: ["csharp","dsharp","esharp","fsharp","gsharp","asharp","bsharp"],
    f: ["f","g","a","bb","c","d","e"],
    bb: ["bb","c","d","eb","f","g","a"],
    eb: ["eb","f","g","ab","bb","c","d"],
    ab: ["ab","bb","c","db","eb","f","g"],
    db: ["db","eb","f","gb","ab","bb","c"],
    gb: ["gb","ab","bb","cb","db","eb","f"]
};

Generator.prototype.chordsinkeys = {
    c: ["c","dm","em","f","g","am","b"],
    g: ["g","am","bm","c","d","em","fsharp"],
    d: ["d","em","fsharpm","g","a","bm","csharp"],
    a: ["a","bm","csharpm","d","e","fsharpm","gsharp"],
    e: ["e","fsharpm","gsharpm","a","b","csharpm","dsharp"],
    b: ["b","csharp","dsharp","e","fsharp","gsharpm","asharp"],
    fsharp: ["fsharp","gsharpm","asharpm","b","csharp","dsharpm","esharp"],
    csharp: ["csharp","dsharpm","esharpm","fsharp","gsharp","asharpm","bsharp"],
    f: ["f","gm","am","bb","c","dm","e"],
    bb: ["bb","cm","dm","eb","f","gm","a"],
    eb: ["eb","fm","gm","ab","bb","cm","d"],
    ab: ["ab","bbm","cm","db","ebm","fm","g"],
    db: ["db","ebm","fm","gb","ab","bbm","c"],
    gb: ["gb","abm","bbm","cb","db","ebm","f"]
};

Generator.prototype.chordprogression = {
    set1: ["1","4","5","1"],
    set2: ["1","2","5","1"],
    set3: ["1","6","4","5"],
    set4: ["1","6","2","5"],
    set5: ["1","4","6","5"],
    set6: ["1","5","6","4"]
};

Generator.prototype.chords = {
    c: ["60","64","67"],
    g: ["67","71","74"],
    d: ["62","66","72"],
    a: ["57","61","64"],
    e: ["64","68","71"],
    b: ["59","63","66"],
    fsharp: ["66","70","73"],
    csharp: ["61","65","68"],
    f: ["65","69","72"],
    bb: ["58","62","65"],
    eb: ["63","67","70"],
    ab: ["56","60","63"],
    db: ["61","65","68"],
    gb: ["66","70","74"],
    cm: ["60","63","67"],
    gm: ["67","70","74"],
    dm: ["62","65","69"],
    am: ["57","60","64"],
    em: ["64","67","71"],
    bm: ["59","63","66"],
    fsharpm: ["66","69","73"],
    csharpm: ["61","64","68"],
    fm: ["65","68","72"],
    bbm: ["58","61","65"],
    ebm: ["63","66","70"],
    abm: ["56","59","63"],
    dbm: ["61","64","68"],
    gbm: ["66","69","73"]
};
