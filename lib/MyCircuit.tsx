import { SmallOutline } from "@tscircuit/footprints"

export const Battery = ({
  name,
  center,
  pcb_x,
  pcb_y,
}: {
  name: string
  center: [number, number]
  pcb_x: number
  pcb_y: number
}) => (
  <component center={center} name={name} pcb_x={pcb_x} pcb_y={pcb_y}>
    <port name="neg" x="-0.5mm" y="0mm" dir="left" />
    <port name="pos" x="0.5mm" y="0mm" dir="right" />
    <schematicbox width="2mm" height="0.5mm" x={0} y={0} />
    <schematictext
      text={name}
      position={{
        x: 0,
        y: 0,
      }}
    />
    <schematictext
      text="-"
      position={{
        x: -0.25,
        y: -0.125,
      }}
    />
    <schematictext
      text="+"
      position={{
        x: 0.25,
        y: -0.125,
      }}
    />
    <smtpad
      shape="rect"
      layer="top"
      x={0}
      y={-26 / 2 - 3 / 2}
      width="4.2mm"
      height="3mm"
      port_hints={["pos"]}
    />
    <smtpad
      shape="rect"
      layer="top"
      x={0}
      y={26 / 2 + 3 / 2}
      width="4.2mm"
      height="3mm"
      port_hints={["neg"]}
    />
  </component>
)

export const MyCircuit = () => (
  <board width="100mm" height="120mm" center_x={0} center_y={0}>
    <resistor
      resistance="100k"
      name="R1"
      footprint="0805"
      center={[-3, 0.5]}
      pcb_x={10}
      pcb_y={5}
      rotation="90deg"
    />
    <resistor
      resistance="1k"
      name="R2"
      pcb_x={10}
      pcb_y={-5}
      footprint="0805"
      center={[-3, -1]}
      rotation="90deg"
    />
    <resistor
      resistance="220"
      name="R3"
      pcb_x={30}
      pcb_y={5}
      footprint="0805"
      rotation="90deg"
      center={[3, 2]}
    />
    <capacitor
      capacitance="10uF"
      name="C1"
      pcb_x={10}
      pcb_y={10}
      footprint="0805"
      center={[-3, 2]}
      rotation="90deg"
    />
    <diode
      name="LED"
      footprint="0805"
      center={[3, 0.5]}
      rotation="90deg"
      pcb_x={30}
      pcb_y={0}
    />
    <bug
      name="U1"
      pcb_x={20}
      pcb_y={0}
      footprint={
        <SmallOutline
          pad_count={8}
          pad_length={0.5}
          pad_width={1}
          pad_pitch={1.27}
          row_spacing={5.5}
        />
      }
      center={[0, 0]}
      port_arrangement={{
        left_side: {
          pins: [6, 7, 2],
        },
        right_side: {
          pins: [8, 4, 3, 5, 1],
        },
      }}
      port_labels={{
        // NE555 port labels
        1: "GND",
        2: "TRIG",
        3: "OUT",
        4: "RESET",
        5: "CTRL",
        6: "THRES",
        7: "DISCH",
        8: "VCC",
      }}
    />
    <Battery name="B1" center={[-1.5, -3]} pcb_x={-30} pcb_y={30} />
    <Battery name="B2" center={[1.5, -3]} pcb_x={-30} pcb_y={-30} />
    <trace from=".B1 > .pos" to=".B2 > .neg" />
    <trace from=".U1 > .DISCH" to=".R2 > .right" />
    <trace from=".R2 > .right" to=".R1 > .left" />
    <trace from=".R1 > .right" to=".C1 > .left" />
    <trace from=".U1 > .THRES" to=".C1 > .left" />
    <trace from=".U1 > .TRIG" to=".C1 > .left" />
    <trace
      from=".C1 > .right"
      to=".B1 > .neg"
      schematic_route_hints={[
        {
          x: -4,
          y: 3,
        },
        {
          x: -4,
          y: -3,
        },
      ]}
    />
    <trace from=".U1 > .GND" to=".C1 > .right" />
    <trace from=".R3 > .right" to=".C1 > .right" />
    <trace from=".LED > .right" to=".R3 > .left" />
    <trace from=".U1 > .OUT" to=".LED > .left" />
    <bug
      name="S1"
      pcb_x={0}
      pcb_y={-20}
      supplier_part_numbers={{
        jlcpcb: ["C2906280"],
      }}
      footprint={
        <SmallOutline
          pad_count={6}
          pad_length={1}
          pad_width={1.5}
          pad_pitch={2.5}
          row_spacing={4.5}
        />
      }
      center={[4, -1.5]}
      port_arrangement={{
        left_size: 3,
        right_size: 3,
      }}
      port_labels={{
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
      }}
    />
    <trace from=".U1 > .RESET" to=".S1 > .3" />
    <trace from=".R2 > .left" to=".S1 > .3" />
    <trace from=".U1 > .VCC" to=".S1 > .3" />

    <trace from=".B2 > .pos" to=".S1 > .2" />
  </board>
)
