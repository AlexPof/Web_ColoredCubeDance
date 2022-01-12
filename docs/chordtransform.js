
var CURRENT_CHORD_PROGRESSION = [];
var APPLIED_AUTOMORPHISMS=["5223","1339","3333"];
let pc_map = new Map([
  ['C',0], ['Cs',1], ['Db',1], ['D',2], ['Ds',3], ['Eb',3], ['E',4], ['F',5], ['Fs',6],
  ['Gb',6], ['G',7], ['Gs',8], ['Ab',8], ['A',9], ['As',10], ['Bb',10], ['B',11]
])
MIDI_QUEUE = []

update_chord_progression_display();

function update_chord_progression_display() {

  d3.select("#successive_transformations").html("");
  var transf_table = d3.select("#successive_transformations").append("table").attr("class","table_automorphisms");

  var new_chord_progr = CURRENT_CHORD_PROGRESSION;
  var succ_data = [];
  succ_data.push({"idx":0,"aut_idx":"none","chord_prog":new_chord_progr})

	for (var i=0;i<APPLIED_AUTOMORPHISMS.length;i++) {
		var aut_idx = APPLIED_AUTOMORPHISMS[i];
		var new_chord_progr = apply_automorphism(aut_idx,new_chord_progr);
    succ_data.push({"idx":i+1,"aut_idx":aut_idx,"chord_prog":new_chord_progr})
  }
  console.log(succ_data);
  var tr_elem = transf_table.selectAll("tr").data(succ_data)
              .enter()
              .append("tr")
              .attr("class","table_automorphisms");
  var td_elem = tr_elem.append("td")
         .style("width","80px").style("padding","0")
         .style("background-size","cover").style("background-repeat","no-repeat")
         .style("background-position","center")
         .style("background-color","darkgray")
		 .style("text-align","center")
		 .style("color","white");

  var temp = td_elem.append("table");
  var temp_uh = temp.append("tr");

  temp_uh.append("td")
         .attr("rowspan","2")
		 .append("p")
		 .style("cursor","pointer")
		 .on("click",function(d){if (d.idx>0) {return impose_automorphism(d.aut_idx);}})
		 .html(function(d){if (d.idx>0) {return d.aut_idx.toString();} else {return "START"}});

     temp_uh.append("td").attr("rowspan","2").filter(function(d){return d.idx==0}).append("img").style("cursor","pointer").attr("src","backspace.png").attr("height","18").style("text-decoration","none")
                          .on("click",function(d){delete_last_chord();});

  temp_uh.append("td").filter(function(d){return d.idx>1}).append("img").style("cursor","pointer").attr("src","arrowup.png").attr("height","18").style("text-decoration","none")
                    .on("click",function(d){step_up(d.idx);});

  temp_uh.append("td").attr("rowspan","2").filter(function(d){return d.idx>0}).append("img").style("cursor","pointer").attr("src","bin.png").attr("height","16").style("text-decoration","none")
                     .on("click",function(d){remove_aut(d.idx);});
  temp_uh.append("td").attr("rowspan","2").filter(function(d){return d.idx>0}).append("img").style("cursor","pointer").attr("src","duplicate.png").attr("height","16").style("text-decoration","none")
                    .on("click",function(d){copy_aut(d.idx);});
  temp.append("tr").append("td").filter(function(d){return d.idx>0 && d.idx<APPLIED_AUTOMORPHISMS.length}).append("img").style("cursor","pointer").attr("src","arrowdown.png").attr("height","18").style("text-decoration","none")
                    .on("click",function(d){step_down(d.idx);});

  td_elem = tr_elem.append("td").attr("width","100px");

  td_elem.append("img").style("cursor","pointer").attr("src","lookingglass_icon.png").attr("height","20").style("text-decoration","none")
                      .on("mouseover",function(d){toggle_progression(d.chord_prog,1);})
                      .on("mouseleave",function(d){toggle_progression(d.chord_prog,0);});

  td_elem.append("img").style("cursor","pointer").attr("src","play_button.png").attr("height","20").style("text-decoration","none")
                                      .on("click",function(d){play_progression(d.chord_prog);});
  td_elem.append("img").style("cursor","pointer").attr("src","stop_button.png").attr("height","20").style("text-decoration","none")
                                      .on("click",function(d){clear_playback();});

  td_elem = tr_elem.append("td")
                   .style("font-size","14px")
                   .style("padding","0")
                   .html(function(d){return get_html_for_progression(d.chord_prog)});
}

function delete_last_chord() {
  CURRENT_CHORD_PROGRESSION.pop();
  update_chord_progression_display();
}

function add_aut(aut_index) {
	APPLIED_AUTOMORPHISMS.push(aut_index);
	update_chord_progression_display();
}

function copy_aut(index) {
	APPLIED_AUTOMORPHISMS.push(APPLIED_AUTOMORPHISMS[index-1]);
	update_chord_progression_display();
}

function remove_aut(index) {
	APPLIED_AUTOMORPHISMS.splice(index-1,1);
	update_chord_progression_display();
}
function step_up(index) {
	if (index==0 || index==1)
		return;
	var temp = APPLIED_AUTOMORPHISMS[index-2];
	APPLIED_AUTOMORPHISMS[index-2] = APPLIED_AUTOMORPHISMS[index-1];
	APPLIED_AUTOMORPHISMS[index-1] = temp;
	update_chord_progression_display();
}

function step_down(index) {
	if (index==0 ||  index==APPLIED_AUTOMORPHISMS.length)
		return;
	var temp = APPLIED_AUTOMORPHISMS[index];
	APPLIED_AUTOMORPHISMS[index] = APPLIED_AUTOMORPHISMS[index-1];
	APPLIED_AUTOMORPHISMS[index-1] = temp;
	update_chord_progression_display();
}

function apply_automorphism(aut_idx,chord_progression) {
	var new_chord_progr=[];

	for (var i=0;i<chord_progression.length;i++) {
		new_chord_progr.push(ALL_AUTS[aut_idx]["chord_mapping"][chord_progression[i]]);
	}

	return new_chord_progr;
}

function get_html_for_progression(chord_progression) {
	var progr_len = chord_progression.length;
	if (progr_len==0) {
		return "";
	}
	var html_code = "<table><tr>"
	html_code+="<td>"+format_chord_string(chord_progression[0])+"</td>";
	for (var i=1;i<progr_len;i++) {
		html_code+="<td style='text-align: center; '>-</td><td style='text-align: center; '>"+format_chord_string(chord_progression[i])+"</td>";
		var op = UPL_OPERATIONS[chord_progression[i-1]][chord_progression[i]];
	}
	html_code+="</tr><tr><td></td>"
	for (var i=1;i<progr_len;i++) {

		var op = UPL_OPERATIONS[chord_progression[i-1]][chord_progression[i]];
		html_code+="<td style='font-size:10px; color:#008CBA; text-align: center; '>"+op+"</td><td></td>";
	}
	html_code+="</tr></table>"
	return html_code;
}

function parse_chord_string(chord_string) {
  // Parse an unformatted chord string into root (as PC number) and chord shape (as offsets)
  let tokens = chord_string.split("_");
  let shape_map = new Map([
    ["m",[0,3,7]],
    ["M",[0,4,7]],
    ["aug",[0,4,8]]
  ]);
  console.log(tokens)
  return {
    'root': pc_map.get(tokens[0]),
    'shape': shape_map.get(tokens[1])
  }
}

function clear_playback(){
  for(midi_timer in MIDI_QUEUE){
    clearTimeout(midi_timer);
  }
  for(var i=0;i<128;i++){
    synth.send(JZZ.MIDI.noteOff(0,i));
  }
}

function play_progression(chord_progression) {
  const inter_onset = 1000; // ms between successive chords
  const silent_gap = 30; //gap between note off and next note on
  const middle_C = 60;
  const playback_velocity = 80;
  let offset = 0;
  clear_playback()
  for(chord_string of chord_progression){
    let chord = parse_chord_string(chord_string);
    console.log(chord.shape)
    for(interval of chord.shape){
      MIDI_QUEUE.push(setTimeout(
        function(root,interval){synth.send(JZZ.MIDI.noteOn(0, middle_C+root+interval, playback_velocity))},
        offset, chord.root, interval));
      console.log(interval)
    }
    offset+=inter_onset-silent_gap;
    for(interval of chord.shape){
      MIDI_QUEUE.push(setTimeout(
        function(root,interval){synth.send(JZZ.MIDI.noteOff(0, middle_C+root+interval))},
        offset, chord.root, interval));
    }
    offset+=silent_gap
  }
}
